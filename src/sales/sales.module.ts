import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsSalesModule } from '../products_sales/products_sales.module';
import { ProvidersModule } from '../providers/providers.module';
import { HttpCustomService } from '../providers/http/http.service';
import { SalesService } from './sales.service';
import { SalesValidationMiddleware } from './sales.middleware';
import { SalesController } from './sales.controller';
import SalesModel from './sales.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SalesModel]),
    ProductsSalesModule,
    ProvidersModule,
  ],
  controllers: [SalesController],
  providers: [SalesService, HttpCustomService],
})
export class SalesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SalesValidationMiddleware)
      .forRoutes({ path: 'sales', method: RequestMethod.POST });
  }
}
