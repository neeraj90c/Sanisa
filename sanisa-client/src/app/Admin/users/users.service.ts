import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateUser, DeleteUserById, ReadAllUsers, ReadAllUsersPaginated, ReadUserById, UpdateUserById, UpdateUserStatus } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateUserDTO, ReadAllPaginated, UpdateUserDTO, UpdateUserStatusDTO, UserMaster, UserList } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  private http = inject(HttpClient)

  ReadAllUsers(): Observable<UserList> {
    return this.http.get<UserList>(ReadAllUsers)
  }

  ReadAllUsersPaginated(data: ReadAllPaginated): Observable<UserList> {
    return this.http.post<UserList>(ReadAllUsersPaginated, data)
  }

  CreateUser(data: CreateUserDTO): Observable<UserMaster> {
    return this.http.post<UserMaster>(CreateUser, data)
  }

  UpdateUserById(data: UpdateUserDTO): Observable<UserMaster> {
    return this.http.post<UserMaster>(UpdateUserById, data)
  }

  UpdateUserStatus(data: UpdateUserStatusDTO): Observable<UserMaster> {
    return this.http.post<UserMaster>(UpdateUserStatus, data)
  }

  ReadUserById(data: { userId: number }): Observable<UserMaster> {
    return this.http.post<UserMaster>(ReadUserById, data)
  }

  DeleteUserById(data: { userId: number, actionUser: string }): Observable<void> {
    return this.http.post<void>(DeleteUserById, data)
  }

  /***************** USER PROJECT MAPPING *****************/
}
