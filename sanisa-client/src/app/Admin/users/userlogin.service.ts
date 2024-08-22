import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserLoginDTO, UpdateUserLoginDTO, userloginresponse, ValidateUserNameResponse } from './userLogin.interface';
import { CreateUserLogin, DeleteUserLogin, ReadUserLoginByUserId, UpdateUserLogin, ValidateUserName } from 'GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor() { }
  private http = inject(HttpClient)

  CreateUserLogin(data: CreateUserLoginDTO): Observable<userloginresponse> {
    return this.http.post<userloginresponse>(CreateUserLogin, data)
  }

  UpdateUserLogin(data: UpdateUserLoginDTO): Observable<userloginresponse> {
    return this.http.post<userloginresponse>(UpdateUserLogin, data)
  }

  ReadUserLoginByUserId(data: { userId: number }): Observable<userloginresponse> {
    return this.http.post<userloginresponse>(ReadUserLoginByUserId, data)
  }

  DeleteUserLogin(data: { loginId: number, actionUser: string }): Observable<void> {
    return this.http.post<void>(DeleteUserLogin, data)
  }

  ValidateUserName(data: { userName: string, companyId: number }): Observable<ValidateUserNameResponse> {
    return this.http.post<ValidateUserNameResponse>(ValidateUserName, data)
  }

}
