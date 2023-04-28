import {
  TypeCompanyDocumentT,
  TypeUsersRolesT,
} from '../../entities/userRoles.entity';

export class Company {
  id?: number;
  id_company?: number;
  name_company: string;
  email: string;
  password: string;
  address_company: string;
  type_document_company: TypeCompanyDocumentT;
  document_company: string;
  logo_company?: string;
  mobile_phone: string;
  fixed_phone?: string;
  roles: TypeUsersRolesT;

  //   clients_limit?: number;
  //   users_limit?: number;

  //   id_membership: number;
  //   membership?: MembershipI;
  //   membership_active: boolean;
  //   membership_expiration_date: Date;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
