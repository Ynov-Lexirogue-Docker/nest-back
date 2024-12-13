import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignRoleInput } from './dto/assign-role.input';
import { User } from '../entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createRoleInput: CreateRoleInput) {
    const role = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id: id } });
  }

  findOneByName(name: string) {
    return this.roleRepository.findOne({ where: { name: name } });
  }

  async update(id: number, updateRoleRepository: UpdateRoleInput) {
    const role = await this.roleRepository.preload({
      id,
      ...updateRoleRepository,
    });
    if (!role) {
      throw new Error('Role not found');
    }
    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    if (!role) {
      throw new Error('Role not found');
    }
    await this.roleRepository.remove(role);
  }

  async assign_roles(assignRoleRepository: AssignRoleInput) {
    const { user_id, role_name } = assignRoleRepository;
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: ['roles'],
    });
    const role = await this.roleRepository.findOne({
      where: { name: role_name },
    });

    if (!user) throw new HttpException('No user found', 404);
    if (!role) throw new HttpException('No role found', 404);

    if (!user.roles.some((role) => role.name === role_name)) {
      user.roles.push(role);
      await this.userRepository.save(user);
    }

    return user;
  }
}
