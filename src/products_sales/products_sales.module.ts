import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsSalesService } from './products_sales.service';
import { ProductsSalesController } from './products_sales.controller';
import ProductsSalesModel from './products_sales.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductsSalesModel])],
  controllers: [ProductsSalesController],
  providers: [ProductsSalesService],
  exports: [ProductsSalesService],
})
export class ProductsSalesModule {}
