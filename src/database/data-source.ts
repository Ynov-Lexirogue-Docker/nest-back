import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/roles/entities/role.entity';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Book, User, Role],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});
