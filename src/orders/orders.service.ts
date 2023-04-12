import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { limitRequest } from '../constants/request.constants';
import ClientsModel from '../clients/clients.model';
import ProductsOrdersModel from '../products-orders/products-orders.model';
import ProductsModel from '../products/products.model';
import { generateSequentialNumber } from '../helpers/handleSerial.helpers';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import OrdersModel from './orders.model';
import { ProductsOrdersService } from '../products-orders/products-orders.service';
import {
  FilterOrdersDefault,
  FilterOrdersI,
  OrderStatusE,
  OrderStatusT,
} from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrdersModel)
    private orderModel: typeof OrdersModel,
    private productsOrdersService: ProductsOrdersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrdersModel> {
    const lastOrder = await this.getLastOrderID();

    const newNumberControl = `NE-${generateSequentialNumber(lastOrder + 1)}`;

    createOrderDto.order_code = newNumberControl;

    const created = await this.orderModel.create({ ...createOrderDto });

    const products = createOrderDto.productsOrders.map((prod) => ({
      ...prod,
      id_order: created.dataValues.id,
    }));

    await this.productsOrdersService.bulkCreate(products);

    return created;
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: OrdersModel[]; count: number }> {
    const ordersList = await this.orderModel.findAndCountAll({
      where: {
        id_company,
      },
      include: [
        {
          model: ClientsModel,
          as: 'client',
        },
        {
          model: ProductsOrdersModel,
          as: 'productsOrders',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
      order: [['id', 'DESC']],
      offset,
      limit: limitRequest,
    });

    return ordersList;
  }

  async findOne(id: number): Promise<OrdersModel> {
    const order = await this.orderModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ClientsModel,
          as: 'client',
        },
        {
          model: ProductsOrdersModel,
          as: 'productsOrders',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
    });

    return order;
  }

  async filterOrders(
    filterOrdersObject: FilterOrdersI = FilterOrdersDefault,
    offset: number,
  ): Promise<{ rows: OrdersModel[]; count: number }> {
    filterOrdersObject = { ...FilterOrdersDefault, ...filterOrdersObject };

    const next = await this.getNextDeliveries(
      filterOrdersObject.delivery_date_range.start,
      filterOrdersObject.delivery_date_range.finish,
      offset,
    );

    const ordersList = await this.orderModel.findAndCountAll({
      where: {
        id_company: filterOrdersObject.id_company,
        [Op.and]: [
          {
            status: {
              [Op.like]: `%${filterOrdersObject.status}%`,
            },
          },
          {
            cancelled: filterOrdersObject.cancelled,
          },
        ],
      },
      order: [['delivery_date', 'ASC']],
      offset,
      limit: limitRequest,
    });

    return ordersList;
  }

  async getLastOrderID(): Promise<number> {
    const order = await this.orderModel.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    return order?.dataValues?.id ?? 0;
  }

  async getNextDeliveries(
    initialDate: Date,
    finalDate: Date,
    offset: number,
  ): Promise<{ rows: OrdersModel[]; count: number }> {
    const ordersList = await this.orderModel.findAndCountAll({
      where: {
        delivery_date: {
          [Op.between]: [initialDate, finalDate],
        },
      },
      offset,
      limit: limitRequest,
    });

    return ordersList;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<number> {
    const [updated] = await this.orderModel.update(updateOrderDto, {
      where: {
        id,
      },
    });

    return updated;
  }

  async changeStatusOrder(
    newStatus: OrderStatusT,
    id: number,
  ): Promise<number> {
    if (newStatus === OrderStatusE.cancelled) {
      const [updated] = await this.orderModel.update(
        { status: newStatus, cancelled: true },
        {
          where: {
            id,
          },
        },
      );

      return updated;
    }

    const [updated] = await this.orderModel.update(
      { status: newStatus },
      {
        where: {
          id,
        },
      },
    );

    return updated;
  }

  async cancelOrder(id: number): Promise<number> {
    const [updated] = await this.orderModel.update(
      { cancelled: true },
      {
        where: {
          id,
        },
      },
    );

    return updated;
  }
}
