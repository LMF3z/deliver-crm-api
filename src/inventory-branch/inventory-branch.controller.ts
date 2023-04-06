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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../constants/roles.decorator';
import { UsersRolesE } from '../entities/userRoles.entity';
import { InventoryBranchService } from './inventory-branch.service';
import { CreateInventoryBranchDto } from './dto/create-inventory-branch.dto';
import { UpdateInventoryBranchDto } from './dto/update-inventory-branch.dto';
import { FilterProductsSubsidiaries } from './entities/inventory-branch.entity';
import InventoryBranchModel from './inventory-branch.model';

@Controller('inventory-branch')
export class InventoryBranchController {
  constructor(
    private readonly inventoryBranchService: InventoryBranchService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post()
  create(@Body() createInventoryBranchDto: CreateInventoryBranchDto) {
    return this.inventoryBranchService.create(createInventoryBranchDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Post('filter')
  filterProducts(
    @Body() filterProductDto: FilterProductsSubsidiaries,
    @Query('offset', ParseIntPipe) offset: number,
  ): Promise<{ rows: InventoryBranchModel[]; count: number }> {
    return this.inventoryBranchService.filterProductsSubsidiaries(
      filterProductDto,
      offset,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get()
  findAll(
    @Query('id_subsidiaries', ParseIntPipe) id_subsidiaries: number,
    @Query('offset', ParseIntPipe) offset: number,
  ) {
    return this.inventoryBranchService.findAll(id_subsidiaries, offset);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN, UsersRolesE.CASHIER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryBranchService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryBranchDto: UpdateInventoryBranchDto,
  ) {
    return this.inventoryBranchService.update(id, updateInventoryBranchDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRolesE.SUPER_ADMIN, UsersRolesE.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryBranchService.remove(id);
  }
}
