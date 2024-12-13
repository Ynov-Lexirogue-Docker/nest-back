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
