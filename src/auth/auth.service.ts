import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  decryptData,
} from 'src/helpers/handlePasswords.helpers';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import {
  Auth,
  LoginCompanyResponseI,
  LoginUserResponseI,
} from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private companiesService: CompaniesService,
    private usersService: UsersService,
  ) {}

  async login(
    dataLogin: Auth,
  ): Promise<LoginCompanyResponseI | LoginUserResponseI> {
    const company = await this.companiesService.findOneByEmail(dataLogin.email);

    if (company === null) {
      return await this.loginUser(dataLogin);
    }

    const isValidPassword = comparePassword(
      dataLogin.password,
      decryptData(company.password),
    );

    if (!isValidPassword)
      throw new HttpException(
        'Error en correo o contraseña',
        HttpStatus.UNAUTHORIZED,
      );

    const payload = {
      id: company.id,
      id_company: company.id,
      email: company.email,
      roles: company.roles,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      ...company.dataValues,
      token,
    };

    return data;
  }

  async loginUser(dataLogin: Auth): Promise<LoginUserResponseI> {
    const user = await this.usersService.findOneByEmail(dataLogin.email);

    const isValidPassword = comparePassword(
      dataLogin.password,
      decryptData(user.password),
    );

    if (!isValidPassword)
      throw new HttpException(
        'Error en correo o contraseña',
        HttpStatus.UNAUTHORIZED,
      );

    const payload = {
      id: user.id,
      id_company: user.id,
      id_subsidiaries: user.id_subsidiaries,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      ...user.dataValues,
      token,
    };

    return data;
  }
}
