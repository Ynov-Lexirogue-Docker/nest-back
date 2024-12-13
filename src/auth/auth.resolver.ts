import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt-auth-guard.guard';
import { User } from '../users/entities/user.entity';
import { Roles } from '../users/roles/roles.decorator';
import { RolesGuard } from './guards/role.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<User> {
    return context.req.user.access_token;
  }

  @Mutation(() => User)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return await this.authService.register(username, password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation(() => String)
  async status(@Context() context: any): Promise<string> {
    return `User ${context.req.user.name} is connected`;
  }
}
