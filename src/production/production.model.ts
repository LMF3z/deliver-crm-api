import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import ProductsModel from '../products/products.model';
import { Production } from './entities/production.entity';

@Table({ tableName: 'production', paranoid: true, timestamps: true })
class ProductionModel extends Model<Production> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_product: number;

  @Column({
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.DATE,
  })
  date_created: Date;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel;
}

export default ProductionModel;
