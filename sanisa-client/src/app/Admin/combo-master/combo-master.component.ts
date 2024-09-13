import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ComboMasterService } from './combo-master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ComboMasterDTO, CreateComboDTO, DeleteComboDTO, ReadAllComboPaginatedDTO, UpdateComboDTO } from './combo-master.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-combo-master',
  templateUrl: './combo-master.component.html',
  styleUrls: ['./combo-master.component.css']
})
export class ComboMasterComponent {

  private comboMasterService = inject(ComboMasterService)

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  @ViewChild('ComboMasterForm', { static: false }) comboFormRef!: ElementRef;
  comboFormModal!: NgbModalRef;
  comboList: ComboMasterDTO[] = []

  ReadAllDTO: ReadAllComboPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  };

  comboForm = new FormGroup({
    comboId: new FormControl(0),
    cCode: new FormControl(''),
    cName: new FormControl('', [Validators.required]),
    cDescription: new FormControl(''),
    creationType: new FormControl(''),
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
    this.getcomboListPaginated(this.ReadAllDTO)
  }






  opencomboForm() {
    this.comboForm.reset()
    this.comboFormModal = this.modalService.open(this.comboFormRef)
  }

  openEditcomboForm(data: ComboMasterDTO) {
    this.comboForm.reset()
    this.comboForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      cCode: data.cCode,
      cDescription: data.cDescription,
      comboId: data.comboId,
      cName: data.cName
    })
    console.log(this.comboForm.value);

    this.comboFormModal = this.modalService.open(this.comboFormRef)
  }





  getcomboListPaginated(data: ReadAllComboPaginatedDTO) {
    this.comboMasterService.ReadAllProductCombos().subscribe(res => {
      this.comboList = res.items
    })
  }

  createcombo(data: CreateComboDTO) {
    this.comboMasterService.CreateProductCombo(data).subscribe(res => {
      this.getcomboListPaginated(this.ReadAllDTO)
      this.comboForm.reset()
      this.comboFormModal.close()
    })
  }

  updatecombo(data: UpdateComboDTO) {
    this.comboMasterService.UpdateProductCombo(data).subscribe(res => {
      this.getcomboListPaginated(this.ReadAllDTO)
      this.comboForm.reset()
      this.comboFormModal.close()
    })
  }

  deletecombo(data: ComboMasterDTO) {
    this.confirmModal.openDeleteModal(data.cName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteComboDTO = {
          comboId: data.comboId,
          actionUser: this.User.userId.toString()
        }
        this.comboMasterService.DeleteProductCombo(ddata).subscribe(res => {
          this.getcomboListPaginated(this.ReadAllDTO)
        }
        )
      }
    })
  }

  submitForm() {
    this.comboForm.markAllAsTouched()
    if (this.comboForm.valid) {
      if (this.comboForm.value.comboId && this.comboForm.value.comboId != 0) {
        let formdata = { ...this.comboForm.value }
        let data: UpdateComboDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          comboId: formdata.comboId as number,
          cCode: formdata.cCode as string,
          cName: formdata.cName as string,
          cDescription: formdata.cDescription as string,
          creationType: formdata.creationType as string
        }
        this.updatecombo(data)
      } else {
        let formdata = { ...this.comboForm.value }
        let data: CreateComboDTO = {
          actionUser: this.User.userId.toString(),
          cCode: formdata.cCode as string,
          cName: formdata.cName as string,
          cDescription: formdata.cDescription as string,
          creationType: formdata.creationType as string,
        }
        this.createcombo(data)
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
    this.getcomboListPaginated(this.ReadAllDTO)
  }

}
