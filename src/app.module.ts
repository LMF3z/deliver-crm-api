import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database/database.config';
import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';
import { JWT_SECRET } from './constants/jwt.constants';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SubsidiariesModule } from './subsidiaries/subsidiaries.module';
import { InventoryBranchModule } from './inventory-branch/inventory-branch.module';
import { ProductionModule } from './production/production.module';
import { ShippingModule } from './shipping/shipping.module';
import { ProductsShippingModule } from './products_shipping/products_shipping.module';
import { ClientsModule } from './clients/clients.module';
import { SalesModule } from './sales/sales.module';
import { ProductsSalesModule } from './products_sales/products_sales.module';
import { ProvidersModule } from './providers/providers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsOrdersModule } from './products-orders/products-orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot(databaseConfig),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    CompaniesModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    SubsidiariesModule,
    InventoryBranchModule,
    ProductionModule,
    ShippingModule,
    ProductsShippingModule,
    ClientsModule,
    SalesModule,
    ProductsSalesModule,
    OrdersModule,
    ProductsOrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
