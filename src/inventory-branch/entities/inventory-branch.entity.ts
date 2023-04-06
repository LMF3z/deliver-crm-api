import ProductsModel from 'src/products/products.model';

export class InventoryBranch {
  id: number;
  id_subsidiaries: number;
  id_product: number;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  product?: ProductsModel;
}

export interface FilterProductsSubsidiaries {
  id_company: number;
  id_subsidiary: number;
  name: string;
  model: string;
  size_range: {
    start: number;
    finish: number;
  };
  color: string;
  brand: string;
  price_range: {
    start: number;
    finish: number;
  };
  price_order: PriceOrderT;
}

export type PriceOrderT = 'ASC' | 'DESC';
export enum PriceOrderE {
  asc = 'ASC',
  desc = 'DESC',
}

export const FilterProductsSubsidiariesDefault: FilterProductsSubsidiaries = {
  id_subsidiary: null,
  id_company: null,
  name: null,
  model: null,
  color: null,
  brand: null,
  size_range: {
    start: 0,
    finish: 100,
  },
  price_range: {
    start: 0,
    finish: 1000,
  },
  price_order: PriceOrderE.asc,
};
