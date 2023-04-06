import { Controller, Post, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post('register')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.registerNewCompany(createCompanyDto);
  }
}
