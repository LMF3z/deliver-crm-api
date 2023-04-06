import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import ProductionModel from './production.model';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductionService {
  constructor(
    @InjectModel(ProductionModel)
    private readonly productionModel: typeof ProductionModel,
    private productsService: ProductsService,
  ) {}

  async createNewProductionRegister(
    createProductionDto: CreateProductionDto,
  ): Promise<ProductionModel> {
    const newProduction = await this.productionModel.create({
      ...createProductionDto,
    });

    await this.productsService.increaseProductStock(
      createProductionDto.id_product,
      createProductionDto.amount,
    );

    return newProduction;
  }

  async findAllProductionsList(
    id_company: number,
    offset: number,
  ): Promise<{ rows: ProductionModel[]; count: number }> {
    const productionList = await this.productionModel.findAndCountAll({
      where: {
        id_company,
      },
      offset,
      limit: limitRequest,
    });
    return productionList;
  }

  async findOne(id: number): Promise<ProductionModel> {
    return await this.productionModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateProductionDto: UpdateProductionDto,
  ): Promise<number> {
    const [updated] = await this.productionModel.update(updateProductionDto, {
      where: {
        id,
      },
    });

    return updated;
  }

  async remove(id: number): Promise<number> {
    const productionStock = await this.findOne(id);

    const deleted = await this.productionModel.destroy({
      where: {
        id,
      },
    });

    await this.productsService.removeFromStock(
      productionStock.dataValues.id_product,
      productionStock.dataValues.amount,
    );

    return deleted;
  }
}
