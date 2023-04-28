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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../constants/roles.decorator';
import { UsersRolesE } from '../entities/userRoles.entity';
import { RolesGuard } from '../auth/roles.guard';
import UsersModel from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: UsersModel }> {
    const created = await this.usersService.createNewUser(createUserDto);

    return {
      message: 'Usuario creado exitosamente',
      data: created,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Get()
  findAll(
    @Query('id_company', ParseIntPipe) id_company: number,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{
    rows: UsersModel[];
    count: number;
  }> {
    return this.usersService.findAll(id_company, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; affectedRows: number }> {
    const updated = await this.usersService.update(id, updateUserDto);
    return {
      message: 'Usuario actualizado exitosamente.',
      affectedRows: updated,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; affectedRows: number }> {
    const deleted = await this.usersService.remove(id);
    return {
      message: 'Usuario eliminado exitosamente.',
      affectedRows: deleted,
    };
  }
}
