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
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../constants/roles.decorator';
import { UsersRolesE } from '../entities/userRoles.entity';
import CompaniesSubsidiariesModel from '../subsidiaries/subsidiaries.model';
import { SubsidiariesService } from './subsidiaries.service';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';

@Controller('subsidiaries')
export class SubsidiariesController {
  constructor(private readonly subsidiariesService: SubsidiariesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  async create(
    @Body() createSubsidiaryDto: CreateSubsidiaryDto,
  ): Promise<{ message: string; data: CompaniesSubsidiariesModel }> {
    const created = await this.subsidiariesService.create(createSubsidiaryDto);

    return {
      message: 'Sucursal registrada exitosamente',
      data: created,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get('all')
  findAll(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{ rows: CompaniesSubsidiariesModel[]; count: number }> {
    return this.subsidiariesService.findAll(id_company, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompaniesSubsidiariesModel> {
    return this.subsidiariesService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubsidiaryDto: UpdateSubsidiaryDto,
  ): Promise<{ message: string; affectedRows: number }> {
    const updated = await this.subsidiariesService.update(
      id,
      updateSubsidiaryDto,
    );
    return {
      message: 'Sucursal actualizada exitosamente',
      affectedRows: updated,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; affectedRows: number }> {
    const deleted = await this.subsidiariesService.remove(id);

    return {
      message: 'Sucursal eliminada exitosamente',
      affectedRows: deleted,
    };
  }
}
