import { Injectable } from '@nestjs/common';
import { CreateProductsOrderDto } from './dto/create-products-order.dto';
import { UpdateProductsOrderDto } from './dto/update-products-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import ProductsOrdersModel from './products-orders.model';

@Injectable()
export class ProductsOrdersService {
  constructor(
    @InjectModel(ProductsOrdersModel)
    private productsOrdersModel: typeof ProductsOrdersModel,
  ) {}

  create(createProductsOrderDto: CreateProductsOrderDto) {
    return 'This create new products order';
  }

  async bulkCreate(
    createProductsOrderDto: CreateProductsOrderDto[],
  ): Promise<ProductsOrdersModel[]> {
    const upsert = await this.productsOrdersModel.bulkCreate(
      createProductsOrderDto,
    );

    return upsert;
  }

  findAll() {
    return `This action returns all productsOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsOrder`;
  }

  update(id: number, updateProductsOrderDto: UpdateProductsOrderDto) {
    return `This action updates a #${id} productsOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsOrder`;
  }
}
