import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { limitRequest } from '../constants/request.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductsModel from './products.model';
import {
  FilterProducts,
  FilterProductsDefault,
} from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductsModel)
    private readonly productsModel: typeof ProductsModel,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductsModel> {
    return await this.productsModel.create({ ...createProductDto });
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    return await this.productsModel.findAndCountAll({
      where: {
        id_company,
        is_active: true,
        stock: {
          [Op.gt]: 0,
        },
      },
      offset,
      limit: limitRequest,
    });
  }

  async findOne(id: number): Promise<ProductsModel> {
    return await this.productsModel.findOne({
      where: {
        id,
        is_active: true,
      },
    });
  }

  async searchProductsByQuery(
    id_company: number,
    offset: number,
    query: string,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    const productsList = await this.productsModel.findAndCountAll({
      where: {
        id_company,
        is_active: true,
        stock: {
          [Op.gt]: 0,
        },
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            model: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            color: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            brand: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      offset,
      limit: limitRequest,
    });

    return productsList;
  }

  async filterProductsResults(
    filterProducts: FilterProducts = FilterProductsDefault,
    offset: number,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    filterProducts = { ...FilterProductsDefault, ...filterProducts };

    const productsList = await this.productsModel.findAndCountAll({
      where: {
        id_company: filterProducts.id_company,
        is_active: true,
        stock: {
          [Op.gt]: 0,
        },
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${filterProducts.name}%`,
            },
          },
          {
            color: {
              [Op.like]: `%${filterProducts.color}%`,
            },
          },
          {
            brand: {
              [Op.like]: `%${filterProducts.brand}%`,
            },
          },
        ],
        [Op.and]: [
          {
            size: {
              [Op.between]: [
                filterProducts.size_range.start,
                filterProducts.size_range.finish,
              ],
            },
          },
          {
            price: {
              [Op.between]: [
                filterProducts.price_range.start,
                filterProducts.price_range.finish,
              ],
            },
          },
        ],
      },
      order: [['price', filterProducts.price_order]],
      offset,
      limit: limitRequest,
    });

    return productsList;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<number> {
    return await this.productsModel.update(updateProductDto, {
      where: {
        id,
      },
    })[0];
  }

  async increaseProductStock(
    id_product: number,
    stock: number,
  ): Promise<number> {
    const productSelected = await this.findOne(id_product);

    const [updated] = await this.productsModel.update(
      { stock: Number(productSelected.dataValues.stock + stock) },
      {
        where: {
          id: id_product,
        },
      },
    );

    if (!updated)
      throw new HttpException(
        'Error al actualizar cantidad del producto',
        HttpStatus.CONFLICT,
      );

    return updated;
  }

  async remove(id: number): Promise<number> {
    const [disabled] = await this.productsModel.update(
      { is_active: false },
      {
        where: {
          id,
        },
      },
    );

    return disabled;
  }

  async removeFromStock(
    id_product: number,
    amountToRemove: number,
  ): Promise<number> {
    const productSelected = await this.findOne(id_product);

    if (productSelected.dataValues.stock < amountToRemove) {
      throw new HttpException(
        'No hay suficiente cantidad de este producto.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updated = await this.update(id_product, {
      stock: Number(productSelected.dataValues.stock - amountToRemove),
    });

    return updated;
  }
}
