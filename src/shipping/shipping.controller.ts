import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../constants/roles.decorator';
import { UsersRolesE } from '../entities/userRoles.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';
import ShippingModel from './shipping.model';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { Shipping } from './entities/shipping.entity';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  async create(
    @Body() createShippingDto: CreateShippingDto,
  ): Promise<{ message: string; data: ShippingModel }> {
    if (createShippingDto.products_shipping.length <= 0)
      throw new HttpException(
        'Debe seleccionar, al menos, un producto',
        HttpStatus.BAD_REQUEST,
      );

    if (
      createShippingDto.products_shipping.some(
        (prod) => prod.price > prod.product?.price!,
      ) ||
      createShippingDto.products_shipping.some(
        (prod) => prod.stock > prod.product?.stock!,
      )
    ) {
      throw new HttpException(
        'Precio y stock no puede ser mayor al del producto seleccionado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const saved = await this.shippingService.createShipping(createShippingDto);

    return {
      message: 'Envio registrado exitosamente.',
      data: saved,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get()
  findAll(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{ rows: ShippingModel[]; count: number }> {
    return this.shippingService.findAllShipping(id_company, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.findOneShipping(id);
  }

  // Solo se pueden actualizar los estados de los shipping
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Patch('/update-status/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShippingDto: Pick<Shipping, 'status' | 'id'>,
  ): Promise<{ message: string; affectedRows: number }> {
    const updated = await this.shippingService.updateShippingStatus(
      id,
      updateShippingDto,
    );
    return {
      message: 'Estatus actualizado exitosamente.',
      affectedRows: updated,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.removeShipping(id);
  }
}
