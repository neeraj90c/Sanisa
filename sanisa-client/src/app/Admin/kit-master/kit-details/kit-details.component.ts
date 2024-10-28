import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { KitMasterService } from '../kit-master.service';
import { KitMasterDTO } from '../kit-master.interface';
import { ItemMasterService } from '../../item-master/item-master.service';
import { ItemMaster } from '../../item-master/item-master.interface';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseImageURL } from 'GlobalVariables';
import { debounceTime, Subject } from 'rxjs';
import { KitDetailsService } from './kit-details.service';
import { CreateKitDetailDTO, DeleteKitDetailDTO } from './kit-detail.interface';

@Component({
  selector: 'app-kit-details',
  templateUrl: './kit-details.component.html',
  styleUrls: ['./kit-details.component.css']
})
export class KitDetailsComponent implements OnInit {



  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private kitMasterServcie = inject(KitMasterService)
  private kitDetailServcie = inject(KitDetailsService)
  private itemMasterServcie = inject(ItemMasterService)
  kitDetail: KitMasterDTO | null = null
  kitItems: ItemMaster[] = []
  itemFormModal!: NgbModalRef;
  private modalService = inject(NgbModal)
  itemList: ItemMaster[] = []
  private searchSubject = new Subject<string>();


  KitItemForm = new FormGroup({
    detailId: new FormControl(0),
    kitId: new FormControl(0),
    itemId: new FormControl(0),
    remarks: new FormControl(''),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })

  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    this.route.paramMap.subscribe(res => {
      if (res.has('id')) {
        let kitId = parseInt(res.get('id') as string)
        this.ReadKitByKitId(kitId)
        this.GetItemsByKitId(kitId)
      }
    })
    console.log(currentParams);
    this.searchSubject.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe(term => {
      this.searchItemByName(term);
    });

    // if (Object.keys(currentParams).length === 0) {
    //   this.router.navigate(['.'], {
    //     queryParams: { pageNo: this.ReadAllDTO.pageNo, pageSize: this.ReadAllDTO.pageSize },
    //     relativeTo: this.route,
    //     replaceUrl: true // Replaces the current URL in the history
    //   })
    // } else {
    //   this.ReadAllDTO.pageSize = currentParams['pageSize']
    //   this.ReadAllDTO.pageNo = currentParams['pageNo']

    // }
    // this.getKitListPaginated(this.ReadAllDTO)
  }


  ReadKitByKitId(kitId: number) {
    this.kitMasterServcie.ReadKitByKitId({ kitId }).subscribe(res => {
      this.kitDetail = res
    })
  }

  GetItemsByKitId(kitId: number) {
    this.itemMasterServcie.ReadItemByKitId({ kitId }).subscribe(res => {
      this.kitItems = res.items
      this.kitItems.map(item => {
        if (item.imagePath) {
          item.imagePath = BaseImageURL + item.imagePath; // Update the imagePath
        }
        return item
      });
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
      this.createKitItem(item.itemId)
    } else {
      let detail = this.kitItems.find(i=> i.itemId == item.itemId)
      if(detail){
        this.DeleteKitItem(detail.detailId!)
      }
    }

  }
  DeleteKitItem(detailId: number) {
    let data: DeleteKitDetailDTO = {
      detailId: detailId,
      actionUser: this.User.userId.toString()
    }
    this.kitDetailServcie.DeleteKitDetail(data).subscribe(res => {
      this.GetItemsByKitId(this.kitDetail?.kitId!)
    })
  }
  createKitItem(itemId: number) {
    let data: CreateKitDetailDTO = {
      kitId: this.kitDetail?.kitId!,
      itemId: itemId,
      remarks: '',
      actionUser: this.User.userId.toString()
    }
    this.kitDetailServcie.CreateKitDetail(data).subscribe(res => {
      this.GetItemsByKitId(this.kitDetail?.kitId!)
    })
  }

  checkBoxChecked(item: ItemMaster): boolean {
    let eItem = this.kitItems.find(i=>i.itemId == item.itemId)
    return eItem ? true : false
  }

  deleteKitMapping(item: ItemMaster) {
    this.confirmModal.openDeleteModal(item?.iName!, item).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteKitItem(item.detailId)
      } else {
        console.log('no res');
      }
    })
  }
    submitForm() {
      throw new Error('Method not implemented.');
    }

}
