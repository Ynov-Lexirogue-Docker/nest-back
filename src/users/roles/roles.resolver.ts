import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { User } from '../entities/user.entity';
import { AssignRoleInput } from './dto/assign-role.input';
import { Roles } from './roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard.guard';
import { RolesGuard } from '../../auth/guards/role.guard';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.findOne(id);
  }

  @Query(() => Role, { name: 'role' })
  findOneByName(@Args('name', { type: () => String }) name: string) {
    return this.rolesService.findOneByName(name);
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.rolesService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.remove(id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async assignRoleToUser(
    @Context() context,
    @Args('assignRoleInput') assignRoleInput: AssignRoleInput,
  ) {
    return this.rolesService.assign_roles(assignRoleInput);
  }
}
