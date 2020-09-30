import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/user.decorator';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { BookService } from './book.service';
import { CreateBookDto, ReadBookDto, UpdateBookDto } from './dtos';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get(':bookId')
  getBook(@Param('userId', ParseIntPipe) bookId: number): Promise<ReadBookDto> {
    return this._bookService.get(bookId);
  }

  @Get('author/:authorId')
  getBooksByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<ReadBookDto[]> {
    return this._bookService.getBookByAuthor(authorId);
  }

  @Get()
  getBooks(): Promise<ReadBookDto[]> {
    return this._bookService.getAll();
  }

  @Post()
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBook(@Body() role: Partial<CreateBookDto>): Promise<ReadBookDto> {
    return this._bookService.create(role);
  }

  @Post('/author')
  @Roles(RoleType.AUTHOR)
  @UseGuards(AuthGuard(), RoleGuard)
  createBookByAuthor(
    @Body() role: Partial<CreateBookDto>,
    @GetUser('id') authorId: number,
  ): Promise<ReadBookDto> {
    return this._bookService.createByAuthor(role, authorId);
  }

  @Patch(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Partial<UpdateBookDto>,
    @GetUser('id') authorId: number,
  ) {
    return this._bookService.update(id, role, authorId);
  }

  @Delete(':id')
  deleteBooks(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._bookService.delete(id);
  }
}