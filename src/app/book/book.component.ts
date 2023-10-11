import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../entities';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  @Input() book?: Book;
}
