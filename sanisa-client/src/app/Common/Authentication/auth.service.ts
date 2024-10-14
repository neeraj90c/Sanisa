import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth, ValidateToken } from 'GlobalVariables';
import { TokenResponse, User, UserLoginDTO, UserResponseDTO } from 'src/app/login/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  UserData = {}

  tokenValidated: boolean = false

  isAuthenticated() {
    if (localStorage.getItem('access_token') != null || localStorage.getItem('access_token') != undefined) {
      return true;
    } else {
      return false
    }
  }

  SignOutUser() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }


  userlogin(data: UserLoginDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(Auth, data);
  }

  validateToken() {
    return this.http.get<TokenResponse>(ValidateToken);
  }


  User(): User {
    let userObject: any = localStorage.getItem('userObject')
    this.UserData = JSON.parse(decodeURIComponent(userObject))
    return JSON.parse(decodeURIComponent(userObject))
  }

  saveUserData(data: User) {
    localStorage.setItem('userObject', encodeURIComponent(JSON.stringify(data)))
    this.tokenValidated = true
  }


  authorizedPages: string[] = []

  UserIsAdmin(): boolean {
    // if (this.User().roleId.includes('369')) {
    //   return true
    // } else {
    //   return false
    // }
    return true
  }


}
