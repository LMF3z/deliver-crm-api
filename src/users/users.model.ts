import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from './entities/user.entity';
import { UsersRolesE } from '../entities/userRoles.entity';

@Table({ tableName: 'companies_users', paranoid: true, timestamps: true })
class UsersModel extends Model<User> {
  @Column({
    type: DataType.INTEGER,
  })
  id_company: number;

  @Column({
    type: DataType.INTEGER,
  })
  id_subsidiaries: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  avatar?: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

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
  type_document: string;

  @Column({
    type: DataType.INTEGER,
  })
  document: number;

  @Column({
    type: DataType.STRING,
  })
  mobile_phone: string;

  @Column({
    type: DataType.STRING,
    defaultValue: UsersRolesE.CASHIER,
  })
  roles: string;
}

export default UsersModel;
