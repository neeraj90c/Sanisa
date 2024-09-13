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

@Component({
  selector: 'app-kit-details',
  templateUrl: './kit-details.component.html',
  styleUrls: ['./kit-details.component.css']
})
export class KitDetailsComponent implements OnInit {
submitForm() {
throw new Error('Method not implemented.');
}


  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private kitMasterServcie = inject(KitMasterService)
  private itemMasterServcie = inject(ItemMasterService)
  kitDetail: KitMasterDTO | null = null
  kitItems: ItemMaster[] = []
  itemFormModal!: NgbModalRef;
  private modalService = inject(NgbModal)

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
        this.GetItemsByKitId()
      }
    })
    console.log(currentParams);

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

  GetItemsByKitId() {
    this.itemMasterServcie.ReadAllItems().subscribe(res => {
      this.kitItems = res.items
    })
  }

  openItemForm(templateRef: TemplateRef<any>) {
    this.itemFormModal = this.modalService.open(templateRef, { size: 'md' })
  }



}
