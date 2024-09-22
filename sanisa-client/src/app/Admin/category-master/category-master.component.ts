import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoryMasterService } from './category-master.service';
import { ReadAllDTO } from 'src/app/Common/common.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryMasterDTO, CreateCategoryDTO, DeleteCategoryDTO, UpdateCategoryDTO } from './category.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.css']
})
export class CategoryMasterComponent {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private categoryMasterServcie = inject(CategoryMasterService)
  @ViewChild('categoryForm', { static: false }) categoryFormRef!: ElementRef;
  categoryFormModal!: NgbModalRef;
  categoryList: CategoryMasterDTO[] = []
  COMPANY_ID = environment.COMPANY_CODE

  CategoryForm = new FormGroup({
    categoryId: new FormControl(0),
    cCode: new FormControl(''),
    cName: new FormControl('', [Validators.required]),
    cDesc: new FormControl(''),
    companyId: new FormControl(0),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })

  ngOnInit(): void {
    // let currentParams = this.route.snapshot.queryParams
    // if (Object.keys(currentParams).length === 0) {
    //   this.router.navigate(['.'], {
    //     queryParams: { pageNo: .pageNo, pageSize: .pageSize },
    //     relativeTo: this.route,
    //     replaceUrl: true // Replaces the current URL in the history
    //   })
    // } else {
    //   .pageSize = currentParams['pageSize']
    //   .pageNo = currentParams['pageNo']

    // }
    this.getCategoryList()
  }






  openCategoryForm() {
    this.CategoryForm.reset()
    this.categoryFormModal = this.modalService.open(this.categoryFormRef)
  }

  openEditCategoryForm(data: CategoryMasterDTO) {
    this.CategoryForm.reset()
    this.CategoryForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      cCode: data.cCode,
      cDesc: data.cDesc,
      categoryId: data.categoryId,
      cName: data.cName,
      companyId: parseInt(this.COMPANY_ID)
    })
    this.categoryFormModal = this.modalService.open(this.categoryFormRef)
  }





  getCategoryList() {
    this.categoryMasterServcie.ReadAllCategory().subscribe(res => {
      this.categoryList = res.items
    })
  }

  createCategory(data: CreateCategoryDTO) {
    this.categoryMasterServcie.CreateCategory(data).subscribe(res => {
      this.getCategoryList()
      this.CategoryForm.reset()
      this.categoryFormModal.close()
    })
  }

  updateCategory(data: UpdateCategoryDTO) {
    this.categoryMasterServcie.UpdateCategory(data).subscribe(res => {
      this.getCategoryList()
      this.CategoryForm.reset()
      this.categoryFormModal.close()
    })
  }

  deleteCategory(data: CategoryMasterDTO) {
    this.confirmModal.openDeleteModal(data.cName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteCategoryDTO = {
          categoryId: data.categoryId,
          actionUser: this.User.userId.toString()
        }
        this.categoryMasterServcie.DeleteCategory(ddata).subscribe(res => {
          this.getCategoryList()
        }
        )
      }
    })
  }

  submitForm() {
    this.CategoryForm.markAllAsTouched()
    if (this.CategoryForm.valid) {
      if (this.CategoryForm.value.categoryId && this.CategoryForm.value.categoryId != 0) {
        let formdata = { ...this.CategoryForm.value }
        let data: UpdateCategoryDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          categoryId: formdata.categoryId as number,
          cCode: formdata.cCode as string,
          cName: formdata.cName as string,
          cDesc: formdata.cDesc as string,
          companyId: parseInt(this.COMPANY_ID)
        }
        this.updateCategory(data)
      } else {
        let formdata = { ...this.CategoryForm.value }
        let data: CreateCategoryDTO = {
          actionUser: this.User.userId.toString(),
          cCode: formdata.cCode as string,
          cName: formdata.cName as string,
          cDesc: formdata.cDesc as string,
          companyId: parseInt(this.COMPANY_ID)
        }
        this.createCategory(data)
      }
    }
  }


  // handlePageSizeChange(e: { currentPage: number; pageSize: number; }) {
  //   .pageNo = e.currentPage
  //   .pageSize = e.pageSize
  //   this.router.navigate(['.'], {
  //     relativeTo: this.route,
  //     queryParams: { pageNo: .pageNo, pageSize: .pageSize },
  //     queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
  //   });
  //   this.getCategoryList()
  // }
}
