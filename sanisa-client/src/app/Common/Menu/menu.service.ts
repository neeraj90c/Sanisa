import { Injectable } from '@angular/core';
import { MenuDataItem, ParentMenu } from './menu.interface';
import { Observable } from 'rxjs';
import { GetMenuForUser } from 'GlobalVariables';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenuForUser(data: ParentMenu): Observable<MenuDataItem> {
    return this.http.post<MenuDataItem>(GetMenuForUser, data);
  }
}
