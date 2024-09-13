import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { KitMasterService } from './kit-master.service';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CreateKitDTO, DeleteKitDTO, KitList, KitMasterDTO, ReadAllKitPaginatedDTO, UpdateKitDTO } from './kit-master.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kit-master',
  templateUrl: './kit-master.component.html',
  styleUrls: ['./kit-master.component.css']
})
export class KitMasterComponent implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private kitMasterServcie = inject(KitMasterService)
  @ViewChild('kitForm', { static: false }) kitFormRef!: ElementRef;
  kitFormModal!: NgbModalRef;
  kitList: KitMasterDTO[] = []

  ReadAllDTO: ReadAllKitPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  };

  KitForm = new FormGroup({
    kitId: new FormControl(0),
    kCode: new FormControl(''),
    kName: new FormControl('', [Validators.required]),
    kDescription: new FormControl(''),
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
    this.getKitListPaginated(this.ReadAllDTO)
  }






  openKitForm() {
    this.KitForm.reset()
    this.kitFormModal = this.modalService.open(this.kitFormRef)
  }

  openEditKitForm(data: KitMasterDTO) {
    this.KitForm.reset()
    this.KitForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      kCode: data.kCode,
      kDescription: data.kDescription,
      kitId: data.kitId,
      kName: data.kName
    })
    this.kitFormModal = this.modalService.open(this.kitFormRef)
  }





  getKitListPaginated(data: ReadAllKitPaginatedDTO) {
    this.kitMasterServcie.ReadAllKitPaginated(data).subscribe(res => {
      this.kitList = res.items
    })
  }

  createKit(data: CreateKitDTO) {
    this.kitMasterServcie.CreateKit(data).subscribe(res => {
      this.getKitListPaginated(this.ReadAllDTO)
      this.KitForm.reset()
      this.kitFormModal.close()
    })
  }

  updateKit(data: UpdateKitDTO) {
    this.kitMasterServcie.UpdateKit(data).subscribe(res => {
      this.getKitListPaginated(this.ReadAllDTO)
      this.KitForm.reset()
      this.kitFormModal.close()
    })
  }

  deleteKit(data: KitMasterDTO) {
    this.confirmModal.openDeleteModal(data.kName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteKitDTO = {
          kitId: data.kitId,
          actionUser: this.User.userId.toString()
        }
        this.kitMasterServcie.DeleteKit(ddata).subscribe(res => {
          this.getKitListPaginated(this.ReadAllDTO)
        }
        )
      }
    })
  }

  submitForm() {
    this.KitForm.markAllAsTouched()
    if (this.KitForm.valid) {
      if (this.KitForm.value.kitId && this.KitForm.value.kitId != 0) {
        let formdata = { ...this.KitForm.value }
        let data: UpdateKitDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          kitId: formdata.kitId as number,
          kCode: formdata.kCode as string,
          kName: formdata.kName as string,
          kDescription: formdata.kDescription as string
        }
        this.updateKit(data)
      } else {
        let formdata = { ...this.KitForm.value }
        let data: CreateKitDTO = {
          actionUser: this.User.userId.toString(),
          kCode: formdata.kCode as string,
          kName: formdata.kName as string,
          kDescription: formdata.kDescription as string
        }
        this.createKit(data)
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
    this.getKitListPaginated(this.ReadAllDTO)
  }
}
