import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ItemMaster } from '../../item-master/item-master.interface';
import { debounceTime, Subject } from 'rxjs';
import { ItemMasterService } from '../../item-master/item-master.service';
import { BaseImageURL } from 'GlobalVariables';
import { ComboMasterDTO } from '../combo-master.interface';
import { ComboMasterService } from '../combo-master.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CreateComboDetailDTO, DeleteComboDetailDTO } from './combo-detail.interface';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ComboDetailService } from './combo-detail.service';
import { MasterType } from 'src/app/Common/master-type.enum';

@Component({
  selector: 'app-combo-detail',
  templateUrl: './combo-detail.component.html',
  styleUrls: ['./combo-detail.component.css']
})
export class ComboDetailComponent implements OnInit {

  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    this.route.paramMap.subscribe(res => {
      if (res.has('id')) {
        let comboId = parseInt(res.get('id') as string)
        this.ReadComboByComboId(comboId)
        this.GetItemsByComboId(comboId)
      }
    })
    this.searchSubject.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe(term => {
      this.searchItemByName(term);
    });
  }
  private route = inject(ActivatedRoute)
  comboItems: ItemMaster[] = []
  itemFormModal!: NgbModalRef;
  modalService = inject(NgbModal)
  itemList: ItemMaster[] = []
  private searchSubject = new Subject<string>();
  private itemMasterServcie = inject(ItemMasterService)
  comboDetail: ComboMasterDTO | null = null
  private User = inject(AuthService).User()
  private confirmModal = inject(ConfirmmodalserviceService)
  comboMasterServcie = inject(ComboMasterService)
  comboDetailService = inject(ComboDetailService)

  ReadComboByComboId(comboId: number) {
    this.comboMasterServcie.ReadComboByComboId({ comboId }).subscribe(res => {
      this.comboDetail = res
    })
  }

  openItemForm(templateRef: TemplateRef<any>) {
    this.itemList = []
    this.itemFormModal = this.modalService.open(templateRef, { size: 'md' })
  }
  onSearchInputChange(e: Event) {
    const target = e.target as HTMLInputElement; // Cast the target to HTMLInputElement
    const term = target.value; // Get the value from the input
    this.searchSubject.next(term); // Emit the search term
  }
  searchItemByName(searchTerm: string) {
    this.itemMasterServcie.SearchItemByName({ searchTerm }).subscribe(res => {
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
  checkBoxChange(e: Event, item: ItemMaster) {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      this.createComboItem(item.itemId)
    } else {
      let detail = this.comboItems.find(i => i.itemId == item.itemId)
      if (detail) {
        this.DeleteComboItem(detail.detailId!)
      }
    }

  }
  createComboItem(itemId: number) {
    let data: CreateComboDetailDTO = {
      comboId: this.comboDetail?.comboId!,
      itemId: itemId,
      remarks: '',
      actionUser: this.User.userId.toString(),
      itemType: MasterType.itemMaster
    }
    this.comboDetailService.CreateComboDetail(data).subscribe(res => {
      this.GetItemsByComboId(this.comboDetail?.comboId!)
    })
  }

  DeleteComboItem(detailId: number) {
    let data: DeleteComboDetailDTO = {
      detailId: detailId,
      actionUser: this.User.userId.toString()
    }
    this.comboDetailService.DeleteComboDetail(data).subscribe(res => {
      this.GetItemsByComboId(this.comboDetail?.comboId!)
    })
  }
  checkBoxChecked(item: ItemMaster): boolean {
    let eItem = this.comboItems.find(i => i.itemId == item.itemId)
    return eItem ? true : false
  }
  GetItemsByComboId(comboId: number) {
    this.itemMasterServcie.ReadItemByComboId({ comboId }).subscribe(res => {
      this.comboItems = res.items
      this.comboItems.map(item => {
        if (item.imagePath) {
          item.imagePath = BaseImageURL + item.imagePath; // Update the imagePath
        }
        return item
      });
    })
  }

  deleteComboMapping(item: ItemMaster) {
    this.confirmModal.openDeleteModal(item?.iName!, item).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteComboItem(item.detailId)
      } else {
        console.log('no res');
      }
    })
  }

}
