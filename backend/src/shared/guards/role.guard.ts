import { Reflector } from '@nestjs/core';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Request } from '../types';

import { Role } from '../role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<Set<Role>>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<Request>();

    if (!roles.has(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
