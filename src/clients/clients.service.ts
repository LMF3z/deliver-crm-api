import { Injectable } from '@nestjs/common';
import { limitRequest } from '../constants/request.constants';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectModel } from '@nestjs/sequelize';
import ClientsModel from './clients.model';
import { Op } from 'sequelize';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientsModel)
    private readonly clientsModel: typeof ClientsModel,
  ) {}

  async createNewClient(
    createClientDto: CreateClientDto,
  ): Promise<ClientsModel> {
    return await this.clientsModel.create({ ...createClientDto });
  }

  async findAllClients(
    id_company: number,
    offset: number,
  ): Promise<{ rows: ClientsModel[]; count: number }> {
    const clientsList = await this.clientsModel.findAndCountAll({
      where: {
        id_company,
      },
      order: [['name', 'ASC']],
      offset,
      limit: limitRequest,
    });

    return clientsList;
  }

  async findOneClient(id: number): Promise<ClientsModel> {
    return await this.clientsModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<number> {
    const [updated] = await this.clientsModel.update(updateClientDto, {
      where: {
        id,
      },
    });

    return updated;
  }

  async removeClient(id: number): Promise<number> {
    const deleted = await this.clientsModel.destroy({
      where: {
        id,
      },
    });

    return deleted;
  }

  async findClientsByQuery(
    id_company: number,
    offset: number,
    query: string,
  ): Promise<{ rows: ClientsModel[]; count: number }> {
    if (!Number.isNaN(Number(query))) {
      const clientsList = await this.clientsModel.findAndCountAll({
        where: {
          id_company,
          document: {
            [Op.like]: `${Number(query)}%`,
          },
        },
        offset,
        limit: limitRequest,
      });

      return clientsList;
    }

    const clientsList = await this.clientsModel.findAndCountAll({
      where: {
        id_company,
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            last_name: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
      offset,
      limit: limitRequest,
    });

    return clientsList;
  }
}
