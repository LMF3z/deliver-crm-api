import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import OrdersModel from '../orders/orders.model';
import ProductsModel from '../products/products.model';
import { ProductsOrder } from './entities/products-order.entity';

@Table({ tableName: 'products_orders', paranoid: true, timestamps: true })
class ProductsOrdersModel extends Model<ProductsOrder> {
  @ForeignKey(() => OrdersModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_order: number;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_product: number;

  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel[];
}

export default ProductsOrdersModel;
