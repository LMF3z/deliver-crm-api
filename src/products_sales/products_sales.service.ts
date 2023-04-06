import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductsSaleDto } from './dto/create-products_sale.dto';
import { UpdateProductsSaleDto } from './dto/update-products_sale.dto';
import { ProductsSale } from './entities/products_sale.entity';
import ProductsSalesModel from './products_sales.model';

@Injectable()
export class ProductsSalesService {
  constructor(
    @InjectModel(ProductsSalesModel)
    private readonly productsSalesModel: typeof ProductsSalesModel,
  ) {}

  create(createProductsSaleDto: CreateProductsSaleDto) {
    return 'This action adds a new productsSale';
  }

  async upsertProductsSale(products_sales: ProductsSale[]) {
    const created = await this.productsSalesModel.bulkCreate(products_sales);
    return created;
  }

  findAll() {
    return `This action returns all productsSales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsSale`;
  }

  update(id: number, updateProductsSaleDto: UpdateProductsSaleDto) {
    return `This action updates a #${id} productsSale`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsSale`;
  }
}
