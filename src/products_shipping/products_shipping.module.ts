import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsShippingService } from './products_shipping.service';
import { ProductsShippingController } from './products_shipping.controller';
import ProductsShippingModel from './products_shipping.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductsShippingModel])],
  controllers: [ProductsShippingController],
  providers: [ProductsShippingService],
  exports: [ProductsShippingService],
})
export class ProductsShippingModule {}
