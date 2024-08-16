import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Common/Authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginDTO } from './login.interface';
import { catchError, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParentMenu } from '../Common/Menu/menu.interface';
import { MenuService } from '../Common/Menu/menu.service';

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
    private menuService: MenuService,

    //private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    // if (this.authService.isAuthenticated()) {
    //   this.router.navigate(['/']);
    // }
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

      this.authService.userlogin(formData as UserLoginDTO).subscribe(res => {
        if (res.data.token.trim() != "") {
          localStorage.setItem('access_token', res.data.token.trim())
          this.authService.validateToken().subscribe(
            {
              next: (res) => {
                let MenuDTO:ParentMenu = {
                  userId: res.userId,
                  roleId: 0,
                  menuId: 0,
                  parentMenuId: 0,
                  subRoleId: 0,
                  subRoleName: '',
                  subRoleCode: '',
                  subRoleDesc: '',
                  displayOrder: 0,
                  defaultChildMenuId: 0,
                  menuIconUrl: '',
                  templatePath: '',
                  isParent: 0,
                  childrenCount: 0,
                  childIsParent: 0,
                  projectId: this.PROJECT_ID
                } 

                /**
                 * This is a temp fix untill GetMenuForUser api isnt fix please remove this afterwards
                 */
                this.authService.saveUserData(res)
                this.router.navigate(['/'])
                /**
                 * END
                 */
                
                this.menuService.getMenuForUser(MenuDTO).subscribe(
                  (userMenu) => {
                    let menuList = userMenu.items.map(res => res.subRoleCode)
                    localStorage.setItem('menuList',menuList.toString())
                    this.authService.saveUserData(res)
                    this.router.navigate(['/'])
                  }
                )


              },
              error: (err) => {
                this.authService.SignOutUser();
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