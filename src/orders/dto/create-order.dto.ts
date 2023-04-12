import { CreateProductsOrderDto } from '../../products-orders/dto/create-products-order.dto';

export class CreateOrderDto {
  id_company: number;
  id_client: number;
  order_code: string;
  title: string;
  description?: string;
  delivery_date: Date;
  total_payment: number;

  // relationships
  productsOrders: CreateProductsOrderDto[];
}
