import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { createBooksServiceMock } from '../../testing';
import { BooksService } from './books.service';

const Q = 'dummy topic';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let booksService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: BooksService, useValue: createBooksServiceMock() }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the search term is added', () => {
    beforeEach(() => {
      component.books$.subscribe();
    });

    it('should initiate a search using the provided term', fakeAsync(() => {
      component.searchTermCtl.setValue(Q);
      tick(500);
      expect(booksService.readBooks).toHaveBeenCalledWith(Q);
    }));
  });
});
