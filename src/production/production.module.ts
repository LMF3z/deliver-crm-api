import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductionService } from './production.service';
import { ProductionController } from './production.controller';
import ProductionModel from './production.model';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductionModel]), ProductsModule],
  controllers: [ProductionController],
  providers: [ProductionService],
})
export class ProductionModule {}
