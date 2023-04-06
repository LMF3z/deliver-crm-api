import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import CompaniesModel from './companies.model';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  encryptData,
  encryptPassword,
} from '../helpers/handlePasswords.helpers';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(CompaniesModel)
    private companiesModel: typeof CompaniesModel,
  ) {}

  async registerNewCompany(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CompaniesModel> {
    createCompanyDto.password = encryptData(
      encryptPassword(createCompanyDto.password),
    );

    return await this.companiesModel.create({ ...createCompanyDto });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(email: string) {
    return this.findOneByEmail(email);
  }

  async findOneByEmail(email: string): Promise<CompaniesModel> {
    const company = await this.companiesModel.findOne({
      where: {
        email,
      },
    });

    if (!company) return null;

    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
