import ProductsModel from '../../products/products.model';

export class Production {
  id?: number;
  id_company: number;
  id_product: number;
  amount: number;
  description: string;
  date_created: Date;

  product: ProductsModel;
}
