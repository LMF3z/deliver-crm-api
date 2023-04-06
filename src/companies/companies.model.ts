import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  TypeCompanyDocumentE,
  UsersRolesE,
} from 'src/entities/userRoles.entity';
import { Company } from './entities/company.entity';

@Table({ tableName: 'companies', paranoid: true, timestamps: true })
class CompaniesModel extends Model<Company> {
  @Column({
    type: DataType.STRING,
  })
  name_company: string;

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
  address_company: string;

  @Column({
    type: DataType.STRING,
    defaultValue: TypeCompanyDocumentE.j,
  })
  type_document_company: string;

  @Column({
    type: DataType.STRING,
  })
  document_company: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  logo_company?: string;

  @Column({
    type: DataType.STRING,
  })
  mobile_phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  fixed_phone?: string;

  @Column({
    type: DataType.STRING,
    defaultValue: UsersRolesE.SUPER_ADMIN,
  })
  roles: string;
}

export default CompaniesModel;
