import { ProductsShipping } from '../../products_shipping/entities/products_shipping.entity';

export class CreateShippingDto {
  id_company: number;
  id_subsidiary: number;
  products_shipping?: ProductsShipping[];
}
