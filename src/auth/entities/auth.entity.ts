import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';

export class Auth {
  email: string;
  password: string;
}

export interface LoginCompanyResponseI extends Company {
  token: string;
}

export interface LoginUserResponseI extends User {
  token: string;
}
