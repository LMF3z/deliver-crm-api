import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order, OrderStatusE } from './entities/order.entity';
import CompaniesModel from '../companies/companies.model';
import ClientsModel from '../clients/clients.model';
import ProductsOrdersModel from '../products-orders/products-orders.model';

@Table({ tableName: 'orders', paranoid: true, timestamps: true })
class OrdersModel extends Model<Order> {
  @ForeignKey(() => CompaniesModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @ForeignKey(() => ClientsModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_client: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  order_code: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  description: string;

  @Column({
    type: DataType.DATE,
  })
  delivery_date: Date;

  @Column({
    type: DataType.FLOAT,
  })
  total_payment: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  cancelled: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: OrderStatusE.pending,
  })
  status: string;

  @BelongsTo(() => ClientsModel)
  client: ClientsModel;

  @HasMany(() => ProductsOrdersModel)
  productsOrders: ProductsOrdersModel[];
}

export default OrdersModel;
