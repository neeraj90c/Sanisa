import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryMasterService } from '../category-master.service';
import { CategoryMasterDTO } from '../category.interface';
import { CategoryDetailService } from './category-detail.service';
import { ItemMasterService } from '../../item-master/item-master.service';
import { ItemMaster } from '../../item-master/item-master.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject } from 'rxjs';
import { BaseImageURL } from 'GlobalVariables';
import { CategoryDetailDTO, CreateCategoryDetailDTO, DeleteCategoryDetailDTO } from './category-detail.interface';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private categoryDetailService = inject(CategoryDetailService)
  private itemMasterService = inject(ItemMasterService)
  private categoryMasterService = inject(CategoryMasterService)
  CategoryDetail: CategoryMasterDTO | null = null
  itemFormModal!: NgbModalRef;
  User = inject(AuthService).User()
  confirmModal = inject(ConfirmmodalserviceService)
  private modalService = inject(NgbModal)
  itemList: ItemMaster[] = []
  private searchSubject = new Subject<string>();
  searchTerm: string = '';
  categoryItemList: ItemMaster[] = [];
  loading: boolean = false

  ngOnInit(): void {
    let currentParams = this.route.snapshot.paramMap.get('id')
    this.getCategoryDetail(parseInt(currentParams!))

    this.searchSubject.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe(term => {
      this.searchItemByName(term);
    });
  }

  getItemsByCategory(categoryId: number) {
    this.loading = true
    this.itemMasterService.ReadByCategoryId({ categoryId }).subscribe(res => {
      this.categoryItemList = res.items
      this.categoryItemList.map(item => {
        if (item.imagePath) {
          item.imagePath = BaseImageURL + item.imagePath; // Update the imagePath
        }
        return item
      });
      this.loading = false
    }
    )
  }

  getCategoryDetail(categoryId: number) {
    this.categoryMasterService.ReadCategoryById({ categoryId }).subscribe(res => {
      this.CategoryDetail = res
    })
    this.getItemsByCategory(categoryId)
  }
  openItemForm(templateRef: TemplateRef<any>) {
    this.itemList = []
    this.itemFormModal = this.modalService.open(templateRef, { size: 'md' })
  }

  searchItemByName(searchTerm: string) {
    this.itemMasterService.SearchItemByName({ searchTerm }).subscribe(res => {
      this.itemList = []
      this.itemList = res.items
      this.itemList.map(item => {
        if (item.imagePath) {
          item.imagePath = BaseImageURL + item.imagePath; // Update the imagePath
        }
        return item
      });
    })
  }

  onSearchInputChange(e: Event) {
    const target = e.target as HTMLInputElement; // Cast the target to HTMLInputElement
    const term = target.value; // Get the value from the input
    this.searchSubject.next(term); // Emit the search term
  }
  checkBoxChange(e: Event, item: ItemMaster) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.createItemCategory(item.itemId)
    } else {
      let detail = this.categoryItemList.find(i => i.itemId == item.itemId)
      if (detail) {
        this.DeleteCategory(detail.detailId!)
      }
    }

  }

  createItemCategory(itemId: number) {
    let data: CreateCategoryDetailDTO = {
      itemId: itemId,
      actionUser: this.User.userId.toString(),
      categoryId: this.CategoryDetail?.categoryId as number
    }
    this.categoryDetailService.CreateCategoryDetail(data).subscribe(res => {
      this.getItemsByCategory(this.CategoryDetail?.categoryId!)
    })
  }

  DeleteCategory(detailId: number) {
    let data: DeleteCategoryDetailDTO = {
      actionUser: this.User.userId.toString(),
      detailId: detailId
    }
    this.categoryDetailService.DeleteCategoryDetail(data).subscribe(res => {
      this.getItemsByCategory(this.CategoryDetail?.categoryId!)
    })
  }

  deleteItemMapping(item: ItemMaster) {
    this.confirmModal.openDeleteModal(item?.iName!, item).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteCategory(item.detailId)
      } else {
        console.log('no res');
      }
    })
  }

  checkBoxChecked(item: ItemMaster): boolean {
    let eItem = this.categoryItemList.find(i => i.itemId == item.itemId)
    return eItem ? true : false
  }

}
