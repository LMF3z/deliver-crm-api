import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Production } from './entities/production.entity';

@Table({ tableName: 'production', paranoid: true, timestamps: true })
class ProductionModel extends Model<Production> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

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
}

export default ProductionModel;
