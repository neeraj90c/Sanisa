import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BrandMasterService } from './brand-master.service';
import { BrandMasterDTO, CreateBrandDTO, DeleteBrandDTO, ReadAllBrandsPaginatedDTO, UpdateBrandDTO } from './brand-master.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.css']
})
export class BrandMasterComponent implements OnInit {
  PROJECT_ID = environment.PROJECT_ID
  Company_ID = environment.COMPANY_CODE

  private brandMasterService = inject(BrandMasterService)
  public modalService = inject(NgbModal)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  public confirmModal = inject(ConfirmmodalserviceService)
  User = inject(AuthService).User()
  @ViewChild('brandForm', { static: false }) addBrandModalContent!: ElementRef;
  addBrandModal!: NgbModalRef;

  brandMasterForm = new FormGroup({
    brandId: new FormControl(0),
    bCode: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    bName: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    bDesc: new FormControl(''),
    actionUser: new FormControl(''),
    companyId: new FormControl(0),
    isActive: new FormControl(0)
  })

  BrandList: BrandMasterDTO[] = []
  ReadAllDTO: ReadAllBrandsPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  }


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
    this.getBrandListPaginated(this.ReadAllDTO)
  }

  getBrandListPaginated(data: ReadAllBrandsPaginatedDTO) {
    this.brandMasterService.ReadAllBrandsPaginated(data).subscribe(res => {
      this.BrandList = res.items
    })
  }

  createBrand(data: CreateBrandDTO) {
    this.brandMasterService.CreateBrand(data).subscribe(res => {
      this.addBrandModal.close()
      this.brandMasterForm.reset()
      this.getBrandListPaginated(this.ReadAllDTO)
    })
  }

  updateBrand(data: UpdateBrandDTO) {
    this.brandMasterService.UpdateBrand(data).subscribe(res => {
      //originalData = res
      this.addBrandModal.close()
      this.brandMasterForm.reset()
      this.getBrandListPaginated(this.ReadAllDTO)
    })
  }

  deleteBrand(brand: BrandMasterDTO) {
    this.confirmModal.openDeleteModal(brand.bName, brand).subscribe(res => {
      console.log(res);
      if (res) {
        let data: DeleteBrandDTO = {
          brandId: brand.brandId,
          actionUser: this.User.userId.toString()
        }
        this.brandMasterService.DeleteBrand(data).subscribe(res => {
          this.getBrandListPaginated(this.ReadAllDTO)
        })
      }
    })
  }


  openEditModal(brand: BrandMasterDTO) {
    this.addBrandModal = this.modalService.open(this.addBrandModalContent)
    this.brandMasterForm.patchValue({
      brandId: brand.brandId,
      bCode: brand.bCode,
      bDesc: brand.bDesc,
      bName: brand.bName,
      companyId: brand.companyId,
      actionUser: this.User.userId.toString(),
      isActive: brand.isActive
    })

  }

  openBrandForm() {
    this.brandMasterForm.reset()
    this.addBrandModal = this.modalService.open(this.addBrandModalContent)
  }

  submitBrandForm() {
    this.brandMasterForm.markAllAsTouched()
    if (this.brandMasterForm.valid) {
      if (this.brandMasterForm.value.brandId && this.brandMasterForm.value.brandId != 0) {
        let data: UpdateBrandDTO = this.brandMasterForm.value as UpdateBrandDTO
        data.actionUser = this.User.userId.toString()
        data.companyId = parseInt(this.Company_ID)
        data.isActive = 1
        this.updateBrand(data)
      } else {
        let data: CreateBrandDTO = this.brandMasterForm.value as CreateBrandDTO
        data.actionUser = this.User.userId.toString()
        data.companyId = parseInt(this.Company_ID)
        this.createBrand(data)
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
    this.getBrandListPaginated(this.ReadAllDTO)
  }

}
