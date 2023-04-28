import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import ShippingModel from './shipping.model';
import { ProductsShippingService } from 'src/products_shipping/products_shipping.service';
import ProductsShippingModel from 'src/products_shipping/products_shipping.model';
import ProductsModel from 'src/products/products.model';
import { ProductsService } from 'src/products/products.service';
import CompaniesSubsidiariesModel from 'src/subsidiaries/subsidiaries.model';
import { Shipping, ShippingStatusE } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel(ShippingModel)
    private shippingModel: typeof ShippingModel,
    private readonly productsService: ProductsService,
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

    for (const productShipping of createShippingDto.products_shipping) {
      await this.productsService.removeFromStock(
        productShipping.id_product,
        productShipping.stock,
      );
    }

    return shippingCreated;
  }

  async findAllShipping(
    id_company: number,
    offset: number,
  ): Promise<{ rows: ShippingModel[]; count: number }> {
    const shippingList = await this.shippingModel.findAndCountAll({
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
        {
          model: CompaniesSubsidiariesModel,
          as: 'subsidiary',
        },
      ],
      order: [['id', 'DESC']],
      offset,
      limit: limitRequest,
    });

    return { rows: shippingList.rows, count: shippingList.count / 2 };
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
        {
          model: CompaniesSubsidiariesModel,
          as: 'subsidiary',
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

  async updateShippingStatus(
    id_shipping: number,
    statusShipping: Pick<Shipping, 'status' | 'id'>,
  ): Promise<number> {
    if (statusShipping.status === ShippingStatusE.rejected) {
      console.log('statusShipping ------------>', statusShipping);

      const shippingSelected = await this.findOneShipping(statusShipping.id);

      for (const productShipping of shippingSelected.dataValues
        .products_shipping) {
        await this.productsService.increaseProductStock(
          productShipping.id_product,
          productShipping.stock,
        );
      }

      return await this.shippingModel.update(
        { ...statusShipping, cancelled: true },
        {
          where: {
            id: id_shipping,
          },
        },
      )[0];
    }

    return await this.shippingModel.update(statusShipping, {
      where: {
        id: id_shipping,
      },
    })[0];
  }

  async removeShipping(id: number): Promise<number> {
    // TODO: retornar el stock de los productos eliminados del shipping a la tabla de productos

    return await this.shippingModel.destroy({
      where: {
        id,
      },
    });
  }
}
