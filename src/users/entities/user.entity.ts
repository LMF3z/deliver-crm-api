import { TypeUsersRolesT } from 'src/entities/userRoles.entity';

export class User {
  id?: number;
  id_company: number;
  id_subsidiaries: number;
  avatar?: string;
  email: string;
  password: string;
  name: string;
  last_name: string;
  type_document: string;
  document: number;
  mobile_phone: string;
  role: TypeUsersRolesT;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
