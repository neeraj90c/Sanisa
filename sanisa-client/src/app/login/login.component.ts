import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Common/Authentication/auth.service';
import { LoaderService } from '../shared/loader/loader.service';
import { UserLoginDTO } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  COMPANY_CODE = environment.COMPANY_CODE
  PROJECT_ID = environment.PROJECT_ID


  loginError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.validateToken().subscribe(
        {
          next: (res) => {
            this.authService.saveUserData(res)
            this.loader.disable()
            this.router.navigate(['/'])
          },
          error: (err) => {
            this.loader.disable()
          }
        }
      )
    }
    this.loader.disable()
  }

  LoginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    companyCode: new FormControl('string')
  });

  loginUser() {
    if (this.LoginForm.valid) {
      const formData = this.LoginForm.value;
      formData.companyCode = this.COMPANY_CODE
      this.loader.enable()
      this.authService.userlogin(formData as UserLoginDTO).subscribe(res => {
        if (res.data.token.trim() != "") {
          localStorage.setItem('access_token', res.data.token.trim())
          this.authService.validateToken().subscribe(
            {
              next: (res) => {
                this.authService.saveUserData(res)
                this.loader.disable()
                this.router.navigate(['/'])
              },
              error: (err) => {
                this.authService.SignOutUser();
                this.loader.disable()
              }
            }
          )
        } else {
          this.loginError = res.data.designation
        }
      })
    }
  }


}