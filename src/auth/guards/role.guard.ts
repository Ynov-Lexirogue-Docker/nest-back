import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../../users/roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const user = req.user;
    if (!user || !user.roles) {
      return false;
    }

    const userRoles = user.roles.map((r: { name: string }) => r.name);
    console.log(userRoles);

    if (user.roles.map((r: { name: string }) => r.name).includes('admin')) {
      return true;
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }
}
