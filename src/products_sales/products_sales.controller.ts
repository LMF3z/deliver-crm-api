import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsSalesService } from './products_sales.service';
import { CreateProductsSaleDto } from './dto/create-products_sale.dto';
import { UpdateProductsSaleDto } from './dto/update-products_sale.dto';

@Controller('products-sales')
export class ProductsSalesController {
  constructor(private readonly productsSalesService: ProductsSalesService) {}

  @Post()
  create(@Body() createProductsSaleDto: CreateProductsSaleDto) {
    return this.productsSalesService.create(createProductsSaleDto);
  }

  @Get()
  findAll() {
    return this.productsSalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsSalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductsSaleDto: UpdateProductsSaleDto) {
    return this.productsSalesService.update(+id, updateProductsSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsSalesService.remove(+id);
  }
}
