import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductsShippingDto } from './dto/create-products_shipping.dto';
import { UpdateProductsShippingDto } from './dto/update-products_shipping.dto';
import { ProductsShipping } from './entities/products_shipping.entity';
import ProductsShippingModel from './products_shipping.model';

@Injectable()
export class ProductsShippingService {
  constructor(
    @InjectModel(ProductsShippingModel)
    private readonly productsShippingModel: typeof ProductsShippingModel,
  ) {}

  create(createProductsShippingDto: CreateProductsShippingDto) {
    return 'This action adds a new productsShipping';
  }

  async upsertProductShipping(products_shipping: ProductsShipping[]) {
    const created = await this.productsShippingModel.bulkCreate(
      products_shipping,
    );
    return created;
  }

  findAll() {
    return `This action returns all productsShipping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsShipping`;
  }

  update(id: number, updateProductsShippingDto: UpdateProductsShippingDto) {
    return `This action updates a #${id} productsShipping`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsShipping`;
  }
}
