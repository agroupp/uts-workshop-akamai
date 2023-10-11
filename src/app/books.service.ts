import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap, firstValueFrom, catchError, EMPTY } from 'rxjs';

import { Book, BooksResponse, mapBooksResItemToBook } from './entities';

const GOOGLE_APIS = 'https://www.googleapis.com/books/v1';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly http = inject(HttpClient);

  readBooks(q: string, startIndex = 0, maxResults = 10): Observable<Book[]> {
    const params = new HttpParams({ fromObject: { q, startIndex, maxResults } });

    return this.http.get<BooksResponse>(`${GOOGLE_APIS}/volumes`, { params })
      .pipe(
        map<BooksResponse, Book[]>(({ items, totalItems }) => items.map(mapBooksResItemToBook)),
      );
  }
}
