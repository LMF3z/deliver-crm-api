import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsModule } from '../products/products.module';
import { InventoryBranchService } from './inventory-branch.service';
import { InventoryBranchController } from './inventory-branch.controller';
import InventoryBranchModel from './inventory-branch.model';

@Module({
  imports: [SequelizeModule.forFeature([InventoryBranchModel]), ProductsModule],
  controllers: [InventoryBranchController],
  providers: [InventoryBranchService],
})
export class InventoryBranchModule {}
