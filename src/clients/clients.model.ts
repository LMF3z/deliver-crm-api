import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Client } from './entities/client.entity';

@Table({ tableName: 'clients', paranoid: true, timestamps: true })
class ClientsModel extends Model<Client> {
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
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  type_identification: string;

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  document: number;

  @Column({
    type: DataType.STRING,
  })
  phone: string;
}

export default ClientsModel;
