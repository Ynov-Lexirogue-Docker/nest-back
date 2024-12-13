import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepository.create(createBookInput);
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookInput: UpdateBookInput): Promise<Book> {
    const book = await this.bookRepository.preload({ id, ...updateBookInput });
    if (!book) {
      throw new Error('Book not found');
    }
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    await this.bookRepository.remove(book);
    return book;
  }
}
