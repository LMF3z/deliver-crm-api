import { SetMetadata } from '@nestjs/common';
import { UsersRolesE } from 'src/entities/userRoles.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UsersRolesE[]) => SetMetadata(ROLES_KEY, roles);
