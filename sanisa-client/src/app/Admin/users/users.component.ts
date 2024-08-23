import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { CreateUserDTO, ReadAllPaginated, UpdateUserDTO, UserMaster } from './users.interface';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';
import { UserloginService } from './userlogin.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { CreateUserLoginDTO } from './userLogin.interface';
import { UserLoginDTO } from 'src/app/login/login.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  PROJECT_ID = environment.PROJECT_ID
  Company_ID = environment.COMPANY_CODE

  private userService = inject(UsersService)
  private userLoginService = inject(UserloginService)
  public modalService = inject(NgbModal)
  public route = inject(ActivatedRoute)
  public router = inject(Router)

  public User = inject(AuthService).User()

  PaginationData: ReadAllPaginated = {
    projectId: this.PROJECT_ID,
    companyId: parseInt(this.Company_ID),
    pageSize: 10,
    pageNo: 1
  }
  UserList: UserMaster[] = [];

  UserForm = new FormGroup({
    userId: new FormControl(0),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), noWhitespaceValidator()]),
    dob: new FormControl(),
  })


  UserLoginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })

  constructor() { }
  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['.'], {
        queryParams: { pageNo: this.PaginationData.pageNo, pageSize: this.PaginationData.pageSize },
        relativeTo: this.route,
        replaceUrl: true // Replaces the current URL in the history
      })
    } else {
      this.PaginationData.pageSize = currentParams['pageSize']
      this.PaginationData.pageNo = currentParams['pageNo']

    }
    this.ReadAllUsersPaginated(this.PaginationData)

    this.UserLoginForm.get('userName')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.validateUsername(value);
      });

  }

  @ViewChild('addUser', { static: false }) addUserModalContent!: ElementRef;
  addUserModal!: NgbModalRef;


  OpenAddUserModal() {
    this.UserForm.reset()
    this.UserLoginForm.reset()
    this.addUserModal = this.modalService.open(this.addUserModalContent, { size: 'lg' });
  }



  openEditModal(user: UserMaster) {
    this.UserForm.reset()
    this.UserLoginForm.reset()
    this.UserLoginForm.disable()
    console.log(user);

    this.UserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      userId: user.userId,
      dob: formatDate(user.dob, 'yyyy-MM-dd', 'en'),
      emailId: user.emailId,

    })
    this.addUserModal = this.modalService.open(this.addUserModalContent, { size: 'lg' });
  }


  ReadAllUsersPaginated(data: ReadAllPaginated) {
    this.userService.ReadAllUsersPaginated(data).subscribe(res => {
      this.UserList = res.items
    })
  }

  getInitials(user: UserMaster): string {
    return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()
  }

  getFullname(user: UserMaster): string {
    if (user.middleName) {
      return `${user.firstName} ${user.middleName} ${user.lastName}`;
    } else {
      return `${user.firstName} ${user.lastName}`;
    }
  }

  handlePageSizeChange(e: any) {
    this.PaginationData.pageNo = e.currentPage
    this.PaginationData.pageSize = e.pageSize

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { pageNo: this.PaginationData.pageNo, pageSize: this.PaginationData.pageSize },
      queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
    });
    this.ReadAllUsersPaginated(this.PaginationData)
  }


  submitUserForm() {

    this.UserForm.markAllAsTouched()
    this.UserLoginForm.markAllAsTouched()
    console.log(this.UserLoginForm.valid);


    if (this.UserForm.valid && this.UserLoginForm.valid) {
      let userFormData = { ...this.UserForm.value }
      let userData: CreateUserDTO = {
        companyId: parseInt(this.Company_ID),
        firstName: userFormData.firstName as string,
        lastName: userFormData.lastName as string,
        mobileNo: userFormData.mobileNo as string,
        emailId: userFormData.emailId as string,
        actionUser: this.User.userId.toString(),
        dob: userFormData.dob
      }
      this.createUser(userData)

    } else if (this.UserForm.valid && (this.UserForm.controls.userId.value && this.UserForm.controls.userId.value != 0)) {

      let userFormData = { ...this.UserForm.value }
      let userData: UpdateUserDTO = {
        companyId: parseInt(this.Company_ID),
        firstName: userFormData.firstName as string,
        lastName: userFormData.lastName as string,
        mobileNo: userFormData.mobileNo as string,
        emailId: userFormData.emailId as string,
        actionUser: this.User.userId.toString(),
        dob: userFormData.dob as Date,
        userId: userFormData.userId as number,
        isActive: 1,
      }
      this.updateUser(userData)
    }
  }


  ValidationIsLoading: boolean = false
  ValidationSuccess: boolean | null = null

  validateUsername(userName: string | null) {
    if (userName === null) {
      this.ValidationSuccess = null; // or handle it according to your needs
      this.ValidationIsLoading = false;
      return;
    }

    this.ValidationIsLoading = true;
    const data = {
      userName: userName,
      companyId: parseInt(this.Company_ID)
    };

    this.userLoginService.ValidateUserName(data).subscribe(res => {
      this.ValidationIsLoading = false;
      if (res.responseCode === 200) {
        this.ValidationSuccess = true;
        // this.UserLoginForm.controls['userName'].setErrors(null);
      } else {
        this.ValidationSuccess = false;
        this.UserLoginForm.controls['userName'].setErrors({ invalidUsername: true });
      }
    });
  }

  createUser(data: CreateUserDTO) {
    this.userService.CreateUser(data).subscribe(res => {

      if (res.userId && this.UserLoginForm.valid) {
        let userloginData: CreateUserLoginDTO = {
          userId: res.userId,
          userName: this.UserLoginForm.value.userName as string,
          userPassword: this.UserLoginForm.value.userPassword as string,
          actionUser: this.User.userId.toString()
        }
        this.createUserLogin(userloginData)
      }

    })
  }

  updateUser(data: UpdateUserDTO) {
    this.userService.UpdateUserById(data).subscribe(res => {
      this.UserForm.reset()
      this.UserLoginForm.reset()
      this.addUserModal.close()
      this.ReadAllUsersPaginated(this.PaginationData)
    })
  }


  createUserLogin(data: CreateUserLoginDTO) {
    this.userLoginService.CreateUserLogin(data).subscribe(res => {
      this.UserForm.reset()
      this.UserLoginForm.reset()
      this.addUserModal.close()
      this.ReadAllUsersPaginated(this.PaginationData)
    })
  }


}
