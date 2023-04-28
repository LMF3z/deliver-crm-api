import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles } from '../constants/roles.decorator';
import { UsersRolesE } from '../entities/userRoles.entity';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductsModel from './products.model';
import { FilterProducts } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ message: string; data: ProductsModel }> {
    const saved = await this.productsService.create(createProductDto);

    return {
      message: 'Producto registrado exitisamente.',
      data: saved,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post('filter')
  filterProducts(
    @Body() filterProductDto: FilterProducts,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    return this.productsService.filterProductsResults(filterProductDto, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get()
  findAll(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    return this.productsService.findAll(id_company, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post('search')
  searchProducts(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('query') query: string,
  ): Promise<{ rows: ProductsModel[]; count: number }> {
    return this.productsService.searchProductsByQuery(
      id_company,
      offset,
      query,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductsModel> {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; affectedRows: number }> {
    const updated = await this.productsService.update(id, updateProductDto);
    return {
      message: 'Producto actualizado exitosamente.',
      affectedRows: updated,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; affectedRows: number }> {
    const deleted = await this.productsService.remove(id);

    return {
      message: 'producto eliminado exitosamente.',
      affectedRows: deleted,
    };
  }
}
