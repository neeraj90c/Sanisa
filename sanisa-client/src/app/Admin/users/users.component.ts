import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { ReadAllPaginated, UserMaster } from './users.interface';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';
import { UserloginService } from './userlogin.service';

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

  PaginationData: ReadAllPaginated = {
    projectId: this.PROJECT_ID,
    companyId: parseInt(this.Company_ID),
    pageSize: 10,
    pageNo: 1
  }
  UserList: UserMaster[] = [];

  UserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), noWhitespaceValidator()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [Validators.required, Validators.minLength(10), noWhitespaceValidator()]),
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

  }

  @ViewChild('addUser', { static: false }) addUserModalContent!: ElementRef;
  addUserModal!: NgbModalRef;


  OpenAddUserModal() {
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
    console.log(this.UserForm.value);
    console.log(this.UserLoginForm.value);

  }


  ValidationIsLoading: boolean = false
  ValidationSuccess: boolean | null = null
  validateUsername(event: any) {
    this.ValidationIsLoading = true;
    const data = {
      userName: event.target.value,
      companyId: parseInt(this.Company_ID)
    };

    this.userLoginService.ValidateUserName(data).subscribe(res => {
      this.ValidationIsLoading = false;
      if (res.responseCode == 200) {
        this.ValidationSuccess = true
      } else {
        this.ValidationSuccess = false
      }
    }
    );
  }


}
