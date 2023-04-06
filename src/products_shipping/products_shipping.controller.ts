import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UsersRolesE } from '../entities/userRoles.entity';
import { Roles } from '../constants/roles.decorator';
import { ProductsShippingService } from './products_shipping.service';
import { CreateProductsShippingDto } from './dto/create-products_shipping.dto';
import { UpdateProductsShippingDto } from './dto/update-products_shipping.dto';

@Controller('products-shipping')
export class ProductsShippingController {
  constructor(
    private readonly productsShippingService: ProductsShippingService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  create(@Body() createProductsShippingDto: CreateProductsShippingDto) {
    return this.productsShippingService.create(createProductsShippingDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get()
  findAll() {
    return this.productsShippingService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsShippingService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductsShippingDto: UpdateProductsShippingDto,
  ) {
    return this.productsShippingService.update(id, updateProductsShippingDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsShippingService.remove(id);
  }
}
