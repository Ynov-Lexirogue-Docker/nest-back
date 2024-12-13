// src/seed.ts
import { AppDataSource } from './database/data-source';
import { Role } from './users/roles/entities/role.entity';
import { Book } from './books/entities/book.entity';
import { BooksSeeder } from './books/books.seeder';
import { RolesSeeder } from './users/roles/roles.seeder';

async function runSeeder() {
  try {
    await AppDataSource.initialize();

    const bookSeeder = new BooksSeeder(AppDataSource.getRepository(Book));
    const rolesSeeder = new RolesSeeder(AppDataSource.getRepository(Role));

    await bookSeeder.seed();
    await rolesSeeder.seed();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeder();
