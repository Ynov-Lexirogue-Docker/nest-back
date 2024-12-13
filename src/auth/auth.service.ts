import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByName(username);
    if (!user) throw new HttpException('user not found', 401);
    if (await bcrypt.compare(password, user.password)) {
      const payload = { sub: user.id, name: user.username, roles: user.roles };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByName(username);
    if (user) throw new HttpException('Username already used', 409);
    const salt_or_round = 10;
    password = await bcrypt.hash(password, salt_or_round);
    return await this.userService.create({ username, password });
  }
}
