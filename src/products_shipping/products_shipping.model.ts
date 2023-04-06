import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductsShipping } from './entities/products_shipping.entity';
import ShippingModel from 'src/shipping/shipping.model';
import ProductsModel from 'src/products/products.model';

@Table({ tableName: 'products_shipping', paranoid: true, timestamps: true })
class ProductsShippingModel extends Model<ProductsShipping> {
  @ForeignKey(() => ShippingModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_shipping: number;

  @ForeignKey(() => ProductsModel)
  @Column({
    type: DataType.INTEGER,
  })
  id_product: number;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  stock: number;

  @BelongsTo(() => ProductsModel)
  product: ProductsModel;
}

export default ProductsShippingModel;
