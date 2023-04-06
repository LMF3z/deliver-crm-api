import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import CompaniesSubsidiariesModel from '../subsidiaries/subsidiaries.model';
import CompaniesModel from '../companies/companies.model';
import ProductsShippingModel from '../products_shipping/products_shipping.model';
import { Shipping, ShippingStatusE } from './entities/shipping.entity';

@Table({ tableName: 'companies_shipping', paranoid: true, timestamps: true })
class ShippingModel extends Model<Shipping> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @Column({
    type: DataType.INTEGER,
  })
  id_subsidiary: number;

  @Column({
    type: DataType.DATE,
  })
  date_ship: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: ShippingStatusE.pending,
  })
  status: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  cancelled: boolean;

  @HasMany(() => ProductsShippingModel)
  products_shipping: ProductsShippingModel[];
}

export default ShippingModel;
