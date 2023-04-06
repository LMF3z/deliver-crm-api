import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Subsidiary } from './entities/subsidiary.entity';

@Table({
  tableName: 'companies_subsidiaries',
  paranoid: true,
  timestamps: true,
})
class CompaniesSubsidiariesModel extends Model<Subsidiary> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  subsidiary_address: string;
}

export default CompaniesSubsidiariesModel;
