import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/schemas/users.schema';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);