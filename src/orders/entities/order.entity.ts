import {
  addDaysToDate,
  getCurrentDateByTimeZone,
  getInitialDateOfMonth,
} from 'src/helpers/handleTimes.helpers';
import { Client } from '../../clients/entities/client.entity';
import { ProductsOrder } from '../../products-orders/entities/products-order.entity';

export class Order {
  id: number;
  id_company: number;
  id_client: number;

  order_code: string;

  title: string;
  description: string;
  delivery_date: Date;
  total_payment: number;
  cancelled: boolean;
  status: OrderStatusT;

  // relationships
  client: Client;
  products: ProductsOrder[];
}

export type OrderStatusT = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export enum OrderStatusE {
  pending = 'PENDING',
  completed = 'COMPLETED',
  cancelled = 'CANCELLED',
}

export interface FilterOrdersI {
  id_company: number;
  delivery_date: Date;
  delivery_date_range: {
    start: Date;
    finish: Date;
  };
  cancelled: boolean;
  status: OrderStatusT;
}
export const FilterOrdersDefault: FilterOrdersI = {
  id_company: null,
  delivery_date: null,
  delivery_date_range: {
    start: getInitialDateOfMonth(),
    finish: addDaysToDate(new Date(getCurrentDateByTimeZone()), 30),
  },
  cancelled: false,
  status: OrderStatusE.pending,
};
