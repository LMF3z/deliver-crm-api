import { ProductsSale } from 'src/products_sales/entities/products_sale.entity';
import { TypePaymentsT } from '../entities/sale.entity';

export class CreateSaleDto {
  id_company: number;
  id_user: number;
  id_subsidiary: number;
  id_client: number;
  sale_code: string;
  total_payment: number;
  rate_dollars: number;
  total_payment_bolivares: number;
  total_payment_dollars: number;
  type_payment: TypePaymentsT;
  reference_code: string | null;
  change: number;

  products: ProductsSale[];
}
