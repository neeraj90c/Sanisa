import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEventDetail, DeleteEventDetail, ReadAllEventDetail, ReadDetailByEventId, ReadDetailByItemId, ReadEventDetailById, UpdateEventDetail } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateEventDetailDTO, DeleteEventDetailDTO, EventDetailDTO, EventDetailList, UpdateEventDetailDTO } from './event-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class EventDetailService {

  http = inject(HttpClient)

  constructor() { }

  CreateEventDetail(data: CreateEventDetailDTO): Observable<EventDetailDTO> {
    return this.http.post<EventDetailDTO>(CreateEventDetail, data)
  }
  UpdateEventDetail(data: UpdateEventDetailDTO): Observable<EventDetailDTO> {
    return this.http.post<EventDetailDTO>(UpdateEventDetail, data)
  }
  ReadEventDetailById(data: { eDetailId: number }): Observable<EventDetailDTO> {
    return this.http.post<EventDetailDTO>(ReadEventDetailById, data)
  }
  DeleteEventDetail(data: DeleteEventDetailDTO): Observable<void> {
    return this.http.post<void>(DeleteEventDetail, data)
  }
  ReadAllEventDetail(): Observable<EventDetailList> {
    return this.http.get<EventDetailList>(ReadAllEventDetail)
  }
  ReadDetailByEventId(data: { eventId: number }): Observable<EventDetailList> {
    return this.http.post<EventDetailList>(ReadDetailByEventId, data)
  }

  ReadDetailByItemId(data: { itemId: number }): Observable<EventDetailList> {
    return this.http.post<EventDetailList>(ReadDetailByItemId, data)
  }
}
