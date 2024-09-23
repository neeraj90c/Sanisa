import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEvent, UpdateEvent, ReadEventById, DeleteEvent, ReadAllEvent } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateEventDTO, DeleteEventDTO, EventList, EventMasterDTO, UpdateEventDTO } from './event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventMasterService {

  constructor() { }
  private http = inject(HttpClient)


  CreateEvent(data: CreateEventDTO): Observable<EventMasterDTO> {
    return this.http.post<EventMasterDTO>(CreateEvent, data)
  }
  UpdateEvent(data: UpdateEventDTO): Observable<EventMasterDTO> {
    return this.http.post<EventMasterDTO>(UpdateEvent, data)
  }
  ReadEventById(data: { eventId: number }): Observable<EventMasterDTO> {
    return this.http.post<EventMasterDTO>(ReadEventById, data)
  }
  DeleteEvent(data: DeleteEventDTO): Observable<void> {
    return this.http.post<void>(DeleteEvent, data)
  }
  ReadAllEvent(): Observable<EventList> {
    return this.http.get<EventList>(ReadAllEvent)
  }

}
