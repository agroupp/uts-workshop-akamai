import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { BooksService } from './books.service';
import { BooksResponse } from './entities';

const Q = 'dummy topic';
const RESPONSE: BooksResponse = {
  items: [],
  totalItems: 10,
};

describe('BooksService', () => {
  let service: BooksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(BooksService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read books from the API', waitForAsync(() => {
    service.readBooks(Q).subscribe(res => {
      expect(res).toEqual(RESPONSE.items);
    });

    const req = httpTestingController.expectOne(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(Q)}&startIndex=0&maxResults=10`);

    expect(req.request.method).toBe('GET');
    req.flush(RESPONSE);
    httpTestingController.verify();
  }));
});
