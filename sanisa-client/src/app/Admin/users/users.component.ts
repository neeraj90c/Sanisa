import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(public modalService: NgbModal) { }
  @ViewChild('addUser', { static: false }) addUserModalContent!: ElementRef;
  addUserModal!: NgbModalRef;


  OpenAddUserModal() {
    console.log('enter');
    this.addUserModal = this.modalService.open(this.addUserModalContent, { size: 'lg' });
  }

}
