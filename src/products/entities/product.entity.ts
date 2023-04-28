export class Product {
  id?: number;
  id_company: number;
  name: string;
  description: string;
  model?: string;
  size?: number;
  color?: string;
  brand: string;
  type: ProductTypesT;
  stock: number;
  price: number;
  images: string[];
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type ProductTypesT = 'zapatos';
export enum ProductTypesE {
  shoes = 'zapatos',
}

export interface FilterProducts {
  id_company: number;
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

export const FilterProductsDefault: FilterProducts = {
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
