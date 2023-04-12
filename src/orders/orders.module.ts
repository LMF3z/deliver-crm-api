import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsOrdersModule } from '../products-orders/products-orders.module';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import OrdersModel from './orders.model';

@Module({
  imports: [SequelizeModule.forFeature([OrdersModel]), ProductsOrdersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
