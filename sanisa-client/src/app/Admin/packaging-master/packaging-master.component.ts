import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreatePackagingDTO, DeletePackagingDTO, PackagingDTO, PackagingReadAllPaginatedDTO, UpdatePackagingDTO } from './packaging-master.interface';
import { PackagingMasterService } from './packaging-master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { UsersService } from '../users/users.service';
import { AuthService } from 'src/app/Common/Authentication/auth.service';

@Component({
  selector: 'app-packaging-master',
  templateUrl: './packaging-master.component.html',
  styleUrls: ['./packaging-master.component.css']
})
export class PackagingMasterComponent implements OnInit {


  private pmService = inject(PackagingMasterService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  @ViewChild('packageForm', { static: false }) packageFormRef!: ElementRef;
  packageFormModal!: NgbModalRef;
  ReadAllDTO: PackagingReadAllPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  };

  PackageList: PackagingDTO[] = [];

  PackageForm = new FormGroup({
    packagingId: new FormControl(0),
    pCode: new FormControl(''),
    pName: new FormControl(''),
    pDesc: new FormControl(''),
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
    this.getPackageListPaginated(this.ReadAllDTO)
  }


  openPackagingForm() {
    this.PackageForm.reset()
    this.packageFormModal = this.modalService.open(this.packageFormRef)
  }

  openEditPackagingForm(data: PackagingDTO) {
    this.PackageForm.reset()
    this.PackageForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      packagingId: data.packagingId,
      pCode: data.pCode,
      pDesc: data.pDesc,
      pName: data.pName,

    })
    this.packageFormModal = this.modalService.open(this.packageFormRef)
  }

  getPackageListPaginated(ReadAllDTO: PackagingReadAllPaginatedDTO) {
    this.pmService.ReadAllPackagingsPaginated(ReadAllDTO).subscribe(res => {
      this.PackageList = res.items
    })
  }

  createPackaging(data: CreatePackagingDTO) {
    this.pmService.CreatePackaging(data).subscribe(res => {
      this.getPackageListPaginated(this.ReadAllDTO)
      this.PackageForm.reset()
      this.packageFormModal.close()
    })
  }

  updatePackaging(data: UpdatePackagingDTO) {
    this.pmService.UpdatePackaging(data).subscribe(es => {
      this.getPackageListPaginated(this.ReadAllDTO)
      this.PackageForm.reset()
      this.packageFormModal.close()
    })
  }

  deletePackage(data: PackagingDTO) {
    this.confirmModal.openDeleteModal(data.pName, data).subscribe(res => {
      if (res) {
        let ddata: DeletePackagingDTO = {
          packagingId: data.packagingId,
          actionUser: this.User.userId.toString()
        }
        this.pmService.DeletePackaging(ddata).subscribe(res => {
          this.getPackageListPaginated(this.ReadAllDTO)
        }
        )
      }
    })
  }






  submitForm() {
    this.PackageForm.markAllAsTouched()
    if (this.PackageForm.valid) {
      let formdata = { ...this.PackageForm.value }
      let data: CreatePackagingDTO = {
        pCode: formdata.pCode as string,
        pName: formdata.pName as string,
        pDesc: formdata.pDesc as string,
        actionUser: this.User.userId.toString()
      }
      this.createPackaging(data)
    } else {
      let formdata = { ...this.PackageForm.value }
      let data: UpdatePackagingDTO = {
        pCode: formdata.pCode as string,
        pName: formdata.pName as string,
        pDesc: formdata.pDesc as string,
        actionUser: this.User.userId.toString(),
        packagingId: formdata.packagingId as number,
        isActive: 1
      }
      this.updatePackaging(data)
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
    this.getPackageListPaginated(this.ReadAllDTO)
  }


}
