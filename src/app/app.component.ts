import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from './books.service';
import { debounceTime, of, switchMap } from 'rxjs';
import { BookComponent } from './book/book.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly booksService = inject(BooksService);

  readonly searchTermCtl = new FormControl<string>('', { nonNullable: true });
  readonly books$ = this.searchTermCtl.valueChanges.pipe(
    debounceTime(500), 
    switchMap(q => q ? this.booksService.readBooks(q) : of([]))
  );
}
