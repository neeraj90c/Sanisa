import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CreateRoleDTO, DeleteRoleDTO, RoleMasterDTO, UpdateRoleDTO } from './role-master.interface';
import { ReadAllDTO } from 'src/app/Common/common.interface';
import { RoleMasterService } from './role-master.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private roleMasterServcie = inject(RoleMasterService)
  @ViewChild('roleForm', { static: false }) roleFormRef!: ElementRef;
  roleFormModal!: NgbModalRef;
  roleList: RoleMasterDTO[] = []

  PROJECT_ID = environment.PROJECT_ID

  ReadAllDTO: ReadAllDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1,
    projectId: this.PROJECT_ID
  };

  RoleForm = new FormGroup({
    roleId: new FormControl(0),
    projectId: new FormControl(0),
    roleName: new FormControl('', [Validators.required]),
    roleCode: new FormControl(''),
    roleDesc: new FormControl(''),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })

  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['.'], {
        queryParams: { pageNo: this.ReadAllDTO.pageNo, pageSize: this.ReadAllDTO.pageSize },
        relativeTo: this.route,
        replaceUrl: true // Replaces the current URL in the history
      })
    } else {
      this.ReadAllDTO.pageSize = currentParams['pageSize']
      this.ReadAllDTO.pageNo = currentParams['pageNo']

    }
    this.getRoleListPaginated(this.ReadAllDTO)
  }






  openRoleForm() {
    this.RoleForm.reset()
    this.roleFormModal = this.modalService.open(this.roleFormRef)
  }

  openEditRoleForm(data: RoleMasterDTO) {
    this.RoleForm.reset()
    this.RoleForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      roleCode: data.roleCode,
      roleDesc: data.roleDesc,
      roleId: data.roleId,
      roleName: data.roleName
    })
    this.roleFormModal = this.modalService.open(this.roleFormRef)
  }





  getRoleListPaginated(data: ReadAllDTO) {
    this.roleMasterServcie.ReadAllPaginatedRole(data).subscribe(res => {
      this.roleList = res.items
    })
  }

  createRole(data: CreateRoleDTO) {
    this.roleMasterServcie.CreateRole(data).subscribe(res => {
      this.getRoleListPaginated(this.ReadAllDTO)
      this.RoleForm.reset()
      this.roleFormModal.close()
    })
  }

  updateRole(data: UpdateRoleDTO) {
    this.roleMasterServcie.UpdateRole(data).subscribe(res => {
      this.getRoleListPaginated(this.ReadAllDTO)
      this.RoleForm.reset()
      this.roleFormModal.close()
    })
  }

  deleteRole(data: RoleMasterDTO) {
    this.confirmModal.openDeleteModal(data.roleName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteRoleDTO = {
          roleId: data.roleId,
          actionUser: this.User.userId.toString()
        }
        this.roleMasterServcie.DeleteRole(ddata).subscribe(res => {
          this.getRoleListPaginated(this.ReadAllDTO)
        }
        )
      }
    })
  }

  submitForm() {
    this.RoleForm.markAllAsTouched()
    if (this.RoleForm.valid) {
      if (this.RoleForm.value.roleId && this.RoleForm.value.roleId != 0) {
        let formdata = { ...this.RoleForm.value }
        let data: UpdateRoleDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          roleId: formdata.roleId as number,
          roleCode: formdata.roleCode as string,
          roleName: formdata.roleName as string,
          roleDesc: formdata.roleDesc as string,
          projectId: this.PROJECT_ID
        }
        this.updateRole(data)
      } else {
        let formdata = { ...this.RoleForm.value }
        let data: CreateRoleDTO = {
          actionUser: this.User.userId.toString(),
          roleCode: formdata.roleCode as string,
          roleName: formdata.roleName as string,
          roleDesc: formdata.roleDesc as string,
          projectId: this.PROJECT_ID
        }
        this.createRole(data)
      }
    }
  }


  handlePageSizeChange(e: { currentPage: number; pageSize: number; }) {
    this.ReadAllDTO.pageNo = e.currentPage
    this.ReadAllDTO.pageSize = e.pageSize
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { pageNo: this.ReadAllDTO.pageNo, pageSize: this.ReadAllDTO.pageSize },
      queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
    });
    this.getRoleListPaginated(this.ReadAllDTO)
  }
}
