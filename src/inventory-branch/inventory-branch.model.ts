import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { InventoryBranch } from './entities/inventory-branch.entity';
import ProductsModel from '../products/products.model';

@Table({
  tableName: 'inventory_branch',
  paranoid: true,
  timestamps: true,
})
class InventoryBranchModel extends Model<InventoryBranch> {
  @Column({
    type: DataType.INTEGER,
  })
  id_subsidiaries: number;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_product: number;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  stock: number;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel;
}

export default InventoryBranchModel;
