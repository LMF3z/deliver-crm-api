import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsSaleDto } from './create-products_sale.dto';

export class UpdateProductsSaleDto extends PartialType(CreateProductsSaleDto) {}
