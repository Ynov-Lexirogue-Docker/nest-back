import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['roles'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  findOneByName(username: string) {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({ id, ...updateUserInput });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }
}
