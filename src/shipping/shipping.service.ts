import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import ShippingModel from './shipping.model';
import { ProductsShippingService } from 'src/products_shipping/products_shipping.service';
import ProductsShippingModel from 'src/products_shipping/products_shipping.model';
import ProductsModel from 'src/products/products.model';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(ShippingModel)
    private shippingModel: typeof ShippingModel,
    private readonly productsShippingService: ProductsShippingService,
  ) {}

  async createShipping(
    createShippingDto: CreateShippingDto,
  ): Promise<ShippingModel> {
    const shippingCreated = await this.shippingModel.create({
      ...createShippingDto,
    });

    const products = createShippingDto.products_shipping.map((product) => ({
      ...product,
      id_shipping: shippingCreated.dataValues.id,
    }));

    await this.productsShippingService.upsertProductShipping(products);

    return shippingCreated;
  }

  async findAllShipping(
    id_company: number,
    offset: number,
  ): Promise<{ rows: ShippingModel[]; count: number }> {
    return await this.shippingModel.findAndCountAll({
      where: {
        id_company,
      },
      include: [
        {
          model: ProductsShippingModel,
          as: 'products_shipping',
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
  }

  async findOneShipping(id: number): Promise<ShippingModel> {
    return await this.shippingModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductsShippingModel,
          as: 'products_shipping',
          include: [
            {
              model: ProductsModel,
              as: 'product',
            },
          ],
        },
      ],
    });
  }

  async updateShipping(
    id: number,
    updateShippingDto: UpdateShippingDto,
  ): Promise<number> {
    return await this.shippingModel.update(updateShippingDto, {
      where: {
        id,
      },
    })[0];
  }

  async removeShipping(id: number): Promise<number> {
    return await this.shippingModel.destroy({
      where: {
        id,
      },
    });
  }
}
