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
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/constants/roles.decorator';
import { UsersRolesE } from 'src/entities/userRoles.entity';
import ProductionModel from './production.model';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  async create(@Body() createProductionDto: CreateProductionDto): Promise<{
    message: string;
    data: ProductionModel;
  }> {
    const saved = await this.productionService.createNewProductionRegister(
      createProductionDto,
    );

    return {
      message: 'Registro guardado exitosamente.',
      data: saved,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get()
  findAll(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{
    rows: ProductionModel[];
    count: number;
  }> {
    return this.productionService.findAllProductionsList(id_company, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductionModel> {
    const production = await this.productionService.findOne(id);

    console.log('production --------------->', production);

    return production;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionService.update(id, updateProductionDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productionService.remove(id);
  }
}
