import ProductsModel from '../../products/products.model';

export class ProductsOrder {
  id: number;
  id_order: number;
  id_product: number;
  amount: number;
  price: number;

  // relationships
  product: ProductsModel[];
}
