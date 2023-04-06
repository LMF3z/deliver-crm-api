import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsShippingDto } from './create-products_shipping.dto';

export class UpdateProductsShippingDto extends PartialType(CreateProductsShippingDto) {}
