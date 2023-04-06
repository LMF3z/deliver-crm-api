import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { limitRequest } from '../constants/request.constants';
import {
  encryptData,
  encryptPassword,
} from '../helpers/handlePasswords.helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UsersModel from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel)
    private userModel: typeof UsersModel,
  ) {}

  async createNewUser(createUserDto: CreateUserDto): Promise<UsersModel> {
    createUserDto.password = encryptData(
      encryptPassword(createUserDto.password),
    );

    const saved = await this.userModel.create({ ...createUserDto });
    return saved;
  }

  async findAll(
    id_company: number,
    offset: number,
  ): Promise<{ rows: UsersModel[]; count: number }> {
    const { rows, count } = await this.userModel.findAndCountAll({
      where: {
        id_company,
      },
      offset,
      limit: limitRequest,
    });

    return { rows, count };
  }

  async findOne(id: number): Promise<UsersModel> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<UsersModel> {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<number> {
    if (updateUserDto.password) {
      updateUserDto.password = encryptData(
        encryptPassword(updateUserDto.password),
      );
    }

    const [affected] = await this.userModel.update(updateUserDto, {
      where: {
        id,
      },
    });
    return affected;
  }

  async remove(id: number): Promise<number> {
    const deleted = await this.userModel.destroy({
      where: {
        id,
      },
    });

    return deleted;
  }
}
