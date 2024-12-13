<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository using GraphQL and MariaDB.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migrations
To execute migrations of the database, you have to first create it using:
```bash
npm run migration:create
```
This will create the database schema used to prepare the generations of the tables, 
so for the next part the command to use will be:
```bash
npm run migration:generate
```
You can see all the migrations in the `src/migrations` folder, or using the command:
```bash
npm run migration:show
```
When you are ready to start the migration, you can use:
```bash
npm run migration:run
```
And all the modification will be registered to the database. In case of mistake, you have the possibility
to revert the modifications:
```bash
npm run migration:revert
```

## Seeder
The seeding process will make you able to test the application with mock data automatically created from the entity.
This is using the package: https://www.npmjs.com/package/nestjs-seeder
1. Add in the entity, the factory from fake seeder such as:
```ts
@Field(() => String)
@Column()
@Factory((faker) => faker.lorem.slug()) //This line is the factory faker
title: string;
```
2. Create a seeder file in the module, for a mariadb db it should look as:
```ts
import { DataFactory, Seeder } from 'nestjs-seeder';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class BooksSeeder implements Seeder {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  seed(): Promise<Book[]> {
    const books = DataFactory.createForClass(Book).generate(10);
    return this.bookRepository.save(books);
  }

  async drop(): Promise<void> {
    await this.bookRepository.clear();
  }
}
```
3. Now you should add the new created seeder to the `src/seeder.ts` file:
```ts
// src/seed.ts
import { AppDataSource } from './database/data-source';
import { BooksSeeder } from './books/books.seeder';
import { Book } from './books/entities/book.entity';

async function runSeeder() {
  try {
    await AppDataSource.initialize();
    
    const bookSeeder = new BooksSeeder(AppDataSource.getRepository(Book)); // Add the seeder
    
    await bookSeeder.seed();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeder();

```
4. Just run the following command and the seeding will be executed:
```bash
npm run seed 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
