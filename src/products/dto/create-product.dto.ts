import { ProductTypesT } from '../entities/product.entity';

export class CreateProductDto {
  id_company: number;
  name: string;
  description: string;
  model?: string;
  size?: number;
  color?: string;
  brand: string;
  type?: ProductTypesT;
  stock: number;
  price: number;
  images: string[];
}
