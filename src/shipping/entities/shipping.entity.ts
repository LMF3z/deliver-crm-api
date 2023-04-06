import { ProductsShipping } from '../../products_shipping/entities/products_shipping.entity';

export class Shipping {
  id?: number;
  id_company: number;
  id_subsidiary: number;
  date_ship: Date;
  status: ShippingStatusT;
  cancelled: boolean;
  products_shipping?: ProductsShipping[];
}

export type ShippingStatusT = 'pending' | 'accepted' | 'rejected';

export enum ShippingStatusE {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}
