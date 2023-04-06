import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import ClientsModel from './clients.model';

@Module({
  imports: [SequelizeModule.forFeature([ClientsModel])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
