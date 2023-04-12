import ProductsModel from '../../products/products.model';

export class ProductsSale {
  id?: number;
  id_sale: number;
  id_product: number;
  amount: number;
  price: number;

  // relationships
  product: ProductsModel[];
}
