import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Sale, TypePaymentsE } from './entities/sale.entity';
import ProductsSalesModel from 'src/products_sales/products_sales.model';

@Table({ tableName: 'companies_sales', paranoid: true, timestamps: true })
class SalesModel extends Model<Sale> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @Column({
    type: DataType.INTEGER,
  })
  id_user: number;

  @Column({
    type: DataType.INTEGER,
  })
  id_subsidiary: number;

  @Column({
    type: DataType.INTEGER,
  })
  id_client: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  id_order: number;

  @Column({
    type: DataType.STRING,
  })
  sale_code: string;

  @Column({
    type: DataType.FLOAT,
  })
  total_payment: number;

  @Column({
    type: DataType.FLOAT,
  })
  rate_dollars: number;

  @Column({
    type: DataType.FLOAT,
  })
  total_payment_bolivares: number;

  @Column({
    type: DataType.STRING,
    defaultValue: TypePaymentsE.cash,
  })
  type_payment: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  reference_code: string | null;

  @Column({
    type: DataType.FLOAT,
  })
  change: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_cancel: boolean;

  @HasMany(() => ProductsSalesModel)
  products: ProductsSalesModel[];
}

export default SalesModel;
