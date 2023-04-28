import {
  AfterFind,
  BeforeFind,
  BeforeFindAfterExpandIncludeAll,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product, ProductTypesE } from './entities/product.entity';

@Table({ tableName: 'products', paranoid: true, timestamps: true })
class ProductsModel extends Model<Product> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  model: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  size?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  color?: string;

  @Column({
    type: DataType.STRING,
  })
  brand: string;

  @Column({
    type: DataType.STRING,
    defaultValue: ProductTypesE.shoes,
  })
  type: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  stock: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  price: number;

  @Column({
    type: DataType.STRING,
  })
  images: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  // @AfterFind
  // static makeArrayOfImages(instance: ProductsModel[]) {
  //   const images = instance.map((ins) => Array.from(ins.images));
  //   console.log('instance ------------>', images.pop());
  // }
}

export default ProductsModel;
