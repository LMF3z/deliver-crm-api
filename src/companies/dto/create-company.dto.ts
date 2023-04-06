import { TypeCompanyDocumentT } from 'src/entities/userRoles.entity';

export class CreateCompanyDto {
  name_company: string;
  email: string;
  password: string;
  address_company: string;
  type_document_company: TypeCompanyDocumentT;
  document_company: string;
  mobile_phone: string;
}
