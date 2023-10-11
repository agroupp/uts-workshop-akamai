import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { BookComponent } from './book.component';
import { BookComponentHarness } from '../../../testing';
import { Component } from '@angular/core';
import { Book } from '../entities';

const BOOK: Book = {
  id: 'ID',
  title: 'Title',
  subtitle: 'Subtitle',
  description: 'Description',
  authors: [],
  imageLinks: {
    smallThumbnail: 'image link'
  }
};

describe('BookComponent', () => {
  @Component({
    standalone: true,
    imports: [BookComponent],
    template: `<app-book [book]="book"></app-book>`,
  })
  class TestHostComponent {
    book?: Book;
  }

  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let harness: BookComponentHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(BookComponentHarness);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the book data is supplied', () => {
    beforeEach(() => {
      component.book = BOOK;
    });

    it('should show the book title', async () => {
      expect(await harness.getTitle()).toBe(BOOK.title);
    });
  });
});
