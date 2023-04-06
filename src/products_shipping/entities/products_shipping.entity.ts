import ProductsModel from 'src/products/products.model';

export class ProductsShipping {
  id?: number;
  id_shipping: number;
  id_product: number;
  price: number;
  stock: number;
  product?: ProductsModel;
}
