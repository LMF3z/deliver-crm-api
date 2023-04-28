import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsShippingModule } from '../products_shipping/products_shipping.module';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import ShippingModel from './shipping.model';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ShippingModel]),
    ProductsModule,
    ProductsShippingModule,
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
