import { Seeder } from 'nestjs-seeder';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const roles: string[] = ['admin', 'webmaster', 'member', 'visitor'];

export class RolesSeeder implements Seeder {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<void> {
    for (const role of roles) {
      const role_temp = this.roleRepository.create({ name: role });
      await this.roleRepository.save(role_temp);
    }
    return;
  }

  async drop(): Promise<void> {
    await this.roleRepository.clear();
  }
}
