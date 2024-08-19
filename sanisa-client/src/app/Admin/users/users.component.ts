import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './users.service';
import { ReadAllPaginated, UserMaster } from './users.interface';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  PROJECT_ID = environment.PROJECT_ID
  Company_ID = environment.COMPANY_CODE

  private userService = inject(UsersService)
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

  constructor() { }
  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['admin/users'], {
        queryParams: { pageNo: this.PaginationData.pageNo, pageSize: this.PaginationData.pageSize },
        queryParamsHandling: 'merge',
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
    console.log('enter');
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


}
