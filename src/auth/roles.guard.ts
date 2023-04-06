import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/constants/roles.decorator';
import { UsersRolesE } from 'src/entities/userRoles.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UsersRolesE[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return false;
    }

    const { companies } = context.switchToHttp().getRequest();

    const hasRole = requiredRoles.some((role) => companies.roles === role);

    if (!hasRole) {
      throw new HttpException(
        'No tienes permisos para realizar esta acción',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return hasRole;
  }
}
