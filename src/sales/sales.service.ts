import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { ProductsSalesService } from '../products_sales/products_sales.service';
import ProductsSalesModel from '../products_sales/products_sales.model';
import ProductsModel from '../products/products.model';
import { OrdersService } from '../orders/orders.service';
import { generateSequentialNumber } from '../helpers/handleSerial.helpers';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import SalesModel from './sales.model';
import { OrderStatusE } from 'src/orders/entities/order.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(SalesModel)
    private readonly salesModel: typeof SalesModel,
    private readonly productsSalesService: ProductsSalesService,
    private readonly ordersService: OrdersService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const lastSale = await this.getLastSaleID();

    const newNumberControl = `NO-${generateSequentialNumber(lastSale + 1)}`;

    createSaleDto.sale_code = newNumberControl;

    const created = await this.salesModel.create({ ...createSaleDto });

    const productsSales = createSaleDto.products.map((productS) => ({
      ...productS,
      id_sale: created.dataValues.id,
    }));

    const productsSaleSaved =
      await this.productsSalesService.upsertProductsSale(productsSales);

    if (!productsSaleSaved) {
      await this.cancelSale(created.dataValues.id);

      throw new HttpException(
        'Error al guardar productos de la venta. Reporte este error',
        HttpStatus.CONFLICT,
      );
    }

    if (createSaleDto.id_order) {
      const updateStatusOrder = await this.ordersService.changeStatusOrder(
        OrderStatusE.completed,
        createSaleDto.id_order,
      );

      if (!updateStatusOrder) {
        await this.cancelSale(created.dataValues.id);

        throw new HttpException(
          'Error al actualizar estado de la orden. Reporte este error',
          HttpStatus.CONFLICT,
        );
      }
    }

    return created;
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: SalesModel[]; count: number }> {
    const salesList = await this.salesModel.findAndCountAll({
      where: {
        id_company,
      },
      include: [
        {
          model: ProductsSalesModel,
          as: 'products',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
      offset,
      limit: limitRequest,
    });

    return { rows: salesList.rows, count: salesList.rows.length };
  }

  async findOne(id: number): Promise<SalesModel> {
    const sale = await this.salesModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductsSalesModel,
          as: 'products',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
    });

    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<number> {
    const [updated] = await this.salesModel.update(updateSaleDto, {
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number): Promise<number> {
    const deleted = await this.salesModel.destroy({ where: { id } });
    return deleted;
  }

  async getLastSaleID() {
    const sale = await this.salesModel.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    return sale?.dataValues?.id ?? 0;
  }

  async cancelSale(id: number): Promise<SalesModel[]> {
    const [_updated, affected] = await this.salesModel.update(
      { is_cancel: true },
      {
        where: { id },
        returning: true,
      },
    );

    return affected;
  }
}
