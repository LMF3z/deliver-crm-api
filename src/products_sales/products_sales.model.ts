import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import SalesModel from '../sales/sales.model';
import ProductsModel from '../products/products.model';
import { ProductsSale } from './entities/products_sale.entity';

@Table({
  tableName: 'products_sales',
  paranoid: true,
  timestamps: true,
})
class ProductsSalesModel extends Model<ProductsSale> {
  @ForeignKey(() => SalesModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_sale: number;

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
    type: DataType.FLOAT,
  })
  price: number;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel;
}

export default ProductsSalesModel;
