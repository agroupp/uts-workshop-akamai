import { ReplaySubject } from 'rxjs';
import { BooksService } from '../src/app/books.service';

type BooksServiceMock = Partial<Record<keyof BooksService, jest.Mock>>;

export function createBooksServiceMock(): BooksServiceMock {
  return {
    readBooks: jest.fn(() => new ReplaySubject()),
  };
}