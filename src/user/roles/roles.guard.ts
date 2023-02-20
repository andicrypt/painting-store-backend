import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/schemas/users.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
        return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    return roles.includes(user.role);
  }
}
