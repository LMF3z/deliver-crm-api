import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_SECRET } from 'src/constants/jwt.constants';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException(
        'No tienes permisos para realizar esta acción',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      request['companies'] = payload;
    } catch (error: unknown) {
      const newError = error as Error;

      if (newError.message === 'jwt expired') {
        throw new HttpException(
          {
            message: 'No tienes permisos para realizar esta acción payload',
            code: 'jwtExpired',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        'No tienes permisos para realizar esta acción payload',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
