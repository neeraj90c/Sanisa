import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventMasterService {

  constructor() { }
  private http = inject(HttpClient)
  
}
