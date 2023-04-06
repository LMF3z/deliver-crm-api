import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import { CreateSubsidiaryDto } from './dto/create-subsidiary.dto';
import { UpdateSubsidiaryDto } from './dto/update-subsidiary.dto';
import CompaniesSubsidiariesModel from './subsidiaries.model';

@Injectable()
export class SubsidiariesService {
  constructor(
    @InjectModel(CompaniesSubsidiariesModel)
    private readonly companiesSubsidiariesModel: typeof CompaniesSubsidiariesModel,
  ) {}

  async create(
    createSubsidiaryDto: CreateSubsidiaryDto,
  ): Promise<CompaniesSubsidiariesModel> {
    return await this.companiesSubsidiariesModel.create({
      ...createSubsidiaryDto,
    });
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: CompaniesSubsidiariesModel[]; count: number }> {
    return await this.companiesSubsidiariesModel.findAndCountAll({
      where: {
        id_company,
      },
      offset,
      limit: limitRequest,
    });
  }

  async findOne(id: number): Promise<CompaniesSubsidiariesModel> {
    return await this.companiesSubsidiariesModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateSubsidiaryDto: UpdateSubsidiaryDto,
  ): Promise<number> {
    console.log('updateSubsidiaryDto 2 ------------>', updateSubsidiaryDto);

    return await this.companiesSubsidiariesModel.update(updateSubsidiaryDto, {
      where: {
        id,
      },
    })[0];
  }

  async remove(id: number): Promise<number> {
    return await this.companiesSubsidiariesModel.destroy({
      where: {
        id,
      },
    });
  }
}
