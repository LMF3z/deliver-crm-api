import { Module } from '@nestjs/common';
import { ProductsOrdersService } from './products-orders.service';
import { ProductsOrdersController } from './products-orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import ProductsOrdersModel from './products-orders.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductsOrdersModel])],
  controllers: [ProductsOrdersController],
  providers: [ProductsOrdersService],
  exports: [ProductsOrdersService],
})
export class ProductsOrdersModule {}
