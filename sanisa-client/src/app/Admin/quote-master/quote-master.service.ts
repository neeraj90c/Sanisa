import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateQuoteDTO, DeleteQuoteDTO, QuoteListDTO, QuoteMasterDTO, UpdateQuoteDTO } from './quote-master.interface';
import { ReadAllDTO } from 'src/app/Common/common.interface';
import { CreateQuote, UpdateQuote, ReadQuoteById, DeleteQuote, ReadAllQuotes, ReadAllQuotesPaginated } from 'GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class QuoteMasterService {

  constructor() { }

  private http = inject(HttpClient)

  CreateQuote(data: CreateQuoteDTO): Observable<QuoteMasterDTO> {
    return this.http.post<QuoteMasterDTO>(CreateQuote, data)
  }
  UpdateQuote(data: UpdateQuoteDTO): Observable<QuoteMasterDTO> {
    return this.http.post<QuoteMasterDTO>(UpdateQuote, data)
  }
  ReadQuoteById(data: { quotId: number }): Observable<QuoteMasterDTO> {
    return this.http.post<QuoteMasterDTO>(ReadQuoteById, data)
  }
  DeleteQuote(data: DeleteQuoteDTO): Observable<void> {
    return this.http.post<void>(DeleteQuote, data)
  }
  ReadAllQuotes(): Observable<QuoteListDTO> {
    return this.http.get<QuoteListDTO>(ReadAllQuotes)
  }
  ReadAllQuotesPaginated(data: ReadAllDTO): Observable<QuoteListDTO> {
    return this.http.post<QuoteListDTO>(ReadAllQuotesPaginated, data)
  }



}
