import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  Auth,
  LoginCompanyResponseI,
  LoginUserResponseI,
} from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dataLogin: Auth,
  ): Promise<{
    message: string;
    data: LoginCompanyResponseI | LoginUserResponseI;
  }> {
    const company = await this.authService.login(dataLogin);

    const data = {
      message: 'Inicio exitoso.',
      data: company,
    };

    return data;
  }
}
