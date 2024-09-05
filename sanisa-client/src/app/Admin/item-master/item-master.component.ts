import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ItemMasterService } from './item-master.service';
import { environment } from 'src/environments/environment';
import { CreateItemDTO, ItemMaster, ReadAllItemsPaginatedDTO } from './item-master.interface';
import { BrandMasterDTO } from '../brand-master/brand-master.interface';
import { BrandMasterService } from '../brand-master/brand-master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';
import { LoaderService } from 'src/app/shared/loader/loader.service';

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
  private loader = inject(LoaderService)

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
    iName: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    iDesc: new FormControl(''),
    iType: new FormControl('', [Validators.required, noWhitespaceValidator, Validators.minLength(3)]),
    packingId: new FormControl(0),
    iSize: new FormControl('', [Validators.required, noWhitespaceValidator]),
    mrpPrinted: new FormControl('', [Validators.required,]),
    moq: new FormControl(0),
    brandId: new FormControl(0),
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

      console.log(res.items);

    })
  }

  createItem(data: CreateItemDTO) {
    this.loader.enable()
    this.itemMasterService.CreateItem(data).subscribe(res => {
      this.loader.disable()
    })
  }

  submitItemForm() {
    let formData = { ...this.ItemForm.value }
    this.ItemForm.markAllAsTouched();
    if (this.ItemForm.valid) {
      if (formData.itemId) {


      } else {
        let data: CreateItemDTO = {
          iCode: formData.iCode as string,
          iName: formData.iName as string,
          iDesc: formData.iDesc as string,
          iType: formData.iType as string,
          packingId: formData.packingId as number,
          iSize: formData.iSize as string,
          mrpPrinted: formData.mrpPrinted as string,
          moq: formData.moq as number,
          brandId: formData.brandId as number,
          actionUser: this.User.userId.toString()
        }

        console.log(data);
        this.createItem(data)

      }
    }

    // let data: CreateItemDTO = {
    //   iCode: 'formData.iCode as string',
    //   iName: 'formData.iName as string',
    //   iDesc: 'formData.iDesc as string',
    //   iType: 'formData.iType as string',
    //   packingId: 1,
    //   iSize: 'formData.iSize as string',
    //   mrpPrinted: 'formData.mrpPrinted as string',
    //   moq: 2,
    //   brandId: 2,
    //   actionUser: this.User.userId.toString()
    // }


  }
  openItemForm() {
    this.ItemForm.reset()
    this.addItemModal = this.modalService.open(this.addItemModalContent, { size: 'lg' })
  }

  onBrancChange() {
    console.log(this.ItemForm.value);
  }

}
