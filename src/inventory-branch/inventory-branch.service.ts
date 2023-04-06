import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { limitRequest } from '../constants/request.constants';
import ProductsModel from '../products/products.model';
import { ProductsService } from '../products/products.service';
import { CreateInventoryBranchDto } from './dto/create-inventory-branch.dto';
import { UpdateInventoryBranchDto } from './dto/update-inventory-branch.dto';
import InventoryBranchModel from './inventory-branch.model';
import {
  FilterProductsSubsidiaries,
  FilterProductsSubsidiariesDefault,
} from './entities/inventory-branch.entity';

@Injectable()
export class InventoryBranchService {
  constructor(
    @InjectModel(InventoryBranchModel)
    private readonly inventoryBranchModel: typeof InventoryBranchModel,
    private readonly productsService: ProductsService,
  ) {}

  async create(
    createInventoryBranchDto: CreateInventoryBranchDto,
  ): Promise<InventoryBranchModel> {
    return await this.inventoryBranchModel.create({
      ...createInventoryBranchDto,
    });
  }

  async findAll(
    id_subsidiaries: number,
    offset: number,
  ): Promise<{ rows: InventoryBranchModel[]; count: number }> {
    const productsList = await this.inventoryBranchModel.findAndCountAll({
      where: {
        id_subsidiaries,
      },
      include: [
        {
          model: ProductsModel,
          as: 'product',
          where: {
            is_active: true,
            stock: {
              [Op.gt]: 0,
            },
          },
        },
      ],
      offset,
      limit: limitRequest,
    });

    return productsList;
  }

  async findOne(id: number): Promise<InventoryBranchModel> {
    const product = await this.inventoryBranchModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ProductsModel,
          as: 'product',
        },
      ],
    });

    return product;
  }

  async filterProductsSubsidiaries(
    filterProducts: FilterProductsSubsidiaries = FilterProductsSubsidiariesDefault,
    offset: number,
  ): Promise<{ rows: InventoryBranchModel[]; count: number }> {
    filterProducts = {
      ...FilterProductsSubsidiariesDefault,
      ...filterProducts,
    };

    const productsList = await this.productsService.filterProductsResults(
      filterProducts,
      offset,
    );

    if (productsList.count === 0) {
      return { rows: [], count: 0 };
    }

    const productsBranchList = await this.findAll(
      filterProducts.id_company,
      offset,
    );

    const productsBranchListResults = productsList.rows.map((productF) => {
      const productBranch = productsBranchList.rows.find((productB) => {
        if (productB.id_product === productF.id) {
          return productB;
        }
      });
      return productBranch;
    });

    const data = {
      count: productsBranchListResults.length,
      rows: productsBranchListResults,
    };

    return data;
  }

  async update(
    id: number,
    updateInventoryBranchDto: UpdateInventoryBranchDto,
  ): Promise<number> {
    const [updated] = await this.inventoryBranchModel.update(
      updateInventoryBranchDto,
      {
        where: { id },
      },
    );

    return updated;
  }

  async remove(id: number): Promise<number> {
    const deleted = await this.inventoryBranchModel.destroy({
      where: { id },
    });
    return deleted;
  }
}
