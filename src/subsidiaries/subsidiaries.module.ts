import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubsidiariesService } from './subsidiaries.service';
import { SubsidiariesController } from './subsidiaries.controller';
import CompaniesSubsidiariesModel from './subsidiaries.model';

@Module({
  imports: [SequelizeModule.forFeature([CompaniesSubsidiariesModel])],
  controllers: [SubsidiariesController],
  providers: [SubsidiariesService],
})
export class SubsidiariesModule {}
