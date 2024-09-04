import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ItemMasterService } from './item-master.service';
import { environment } from 'src/environments/environment';
import { ItemMaster, ReadAllItemsPaginatedDTO } from './item-master.interface';
import { BrandMasterDTO } from '../brand-master/brand-master.interface';
import { BrandMasterService } from '../brand-master/brand-master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {

  Company_ID = environment.COMPANY_CODE
  public modalService = inject(NgbModal)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private itemMasterService = inject(ItemMasterService)
  private brandMasterService = inject(BrandMasterService)

  public confirmModal = inject(ConfirmmodalserviceService)
  User = inject(AuthService).User()
  @ViewChild('itemForm', { static: false }) addItemModalContent!: ElementRef;
  addItemModal!: NgbModalRef;

  ReadAllDTO: ReadAllItemsPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  }
  ItemList: ItemMaster[] = [];
  BrandList: BrandMasterDTO[] = []

  ItemForm = new FormGroup({
    itemId: new FormControl(0),
    iCode: new FormControl(''),
    iName: new FormControl('',[Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    iDesc: new FormControl(''),
    iType: new FormControl('',[Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    packingId: new FormControl(0),
    iSize: new FormControl('',[Validators.required, noWhitespaceValidator]),
    mrpPrinted: new FormControl('',[Validators.required, noWhitespaceValidator ]),
    moq: new FormControl(0,[Validators.required, noWhitespaceValidator ]),
    brandId: new FormControl(0,[Validators.required]),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })



  ngOnInit(): void {
    this.getAllBrandList()
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
    this.getItemListPaginated(this.ReadAllDTO)
  }

  getItemListPaginated(ReadAllDTO: ReadAllItemsPaginatedDTO) {
    this.itemMasterService.ReadAllItemsPaginated(ReadAllDTO).subscribe(res => {
      this.ItemList = res.items
    })
  }

  getAllBrandList() {
    this.brandMasterService.ReadAllBrands().subscribe(res => {
      this.BrandList = res.items
    })
  }


  submitItemForm() {
    console.log(this.ItemForm.value);
    
  }
  openItemForm() {
    this.ItemForm.reset()
    this.addItemModal = this.modalService.open(this.addItemModalContent, { size: 'lg' })
  }

}
