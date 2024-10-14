import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { ItemMasterService } from './item-master.service';
import { environment } from 'src/environments/environment';
import { CreateItemDTO, DeleteItemDTO, ItemMaster, ReadAllItemsPaginatedDTO, UpdateItemDTO } from './item-master.interface';
import { BrandMasterDTO } from '../brand-master/brand-master.interface';
import { BrandMasterService } from '../brand-master/brand-master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'src/app/shared/validators/noWhitespaceValidator';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { nonZeroValidator } from 'src/app/shared/validators/nonZeroValidator';
import { MatStepper } from '@angular/material/stepper';
import { ItemPriceService } from './item-price.service';
import { CreateItemPriceDTO, ReadItemPriceByItemIdDTO } from './item-price.interface';
import { ImageMasterService } from 'src/app/Common/image-master/image-master.service';
import { CreateImageDTO } from 'src/app/Common/image-master/image-master.interface';

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
  private itemPriceService = inject(ItemPriceService)
  private imageMasterService = inject(ImageMasterService)
  private brandMasterService = inject(BrandMasterService)
  private loader = inject(LoaderService)
  public confirmModal = inject(ConfirmmodalserviceService)
  public offcanvasService = inject(NgbOffcanvas);
  User = inject(AuthService).User()
  @ViewChild('itemForm', { static: false }) addItemModalContent!: ElementRef;
  addItemModal!: NgbModalRef;

  viewProductDetailModal: NgbOffcanvasRef | null = null;
  loading:boolean = true

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
    mrpPrinted: new FormControl('', [Validators.required, noWhitespaceValidator]),
    moq: new FormControl(0, [Validators.required, noWhitespaceValidator]),
    brandId: new FormControl(0, [Validators.required, noWhitespaceValidator]),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })

  ItemPriceForm = new FormGroup({
    priceId: new FormControl(0),
    itemId: new FormControl(0, [Validators.required]),
    mrp: new FormControl(0, [Validators.required, nonZeroValidator()]),
    iP1: new FormControl(0, [Validators.required, nonZeroValidator()]),
    iP2: new FormControl(0, [Validators.required, nonZeroValidator()]),
    iP3: new FormControl(0, [Validators.required, nonZeroValidator()]),
    cp: new FormControl(0, [Validators.required, nonZeroValidator()]),
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
    this.loading = true
    this.itemMasterService.ReadAllItemsPaginated(ReadAllDTO).subscribe(res => {
      this.ItemList = res.items
      this.loading = false
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
      let itemPriceForm = { ...this.ItemPriceForm.value }
      let itemPrice: CreateItemPriceDTO = {
        itemId: res.itemId,
        mrp: itemPriceForm.mrp as number as number,
        iP1: itemPriceForm.iP1 as number,
        iP2: itemPriceForm.iP2 as number,
        iP3: itemPriceForm.iP3 as number,
        cp: itemPriceForm.cp as number,
        actionUser: this.User.userId.toString()
      }
      this.createITemPrice(itemPrice)
      this.createItemImage(res)

    })
  }

  updateItem(data: UpdateItemDTO) {
    this.loader.enable()
    this.itemMasterService.UpdateItem(data).subscribe(res => {
      this.getItemListPaginated(this.ReadAllDTO)
      this.addItemModal.close()
      this.loader.disable()
    })
  }

  deleteItem(item: ItemMaster) {
    this.confirmModal.openDeleteModal(item.iName, item).subscribe(res => {
      if (res) {
        let ddata: DeleteItemDTO = {
          itemId: item.itemId,
          actionUser: this.User.userId.toString()
        }
        this.itemMasterService.DeleteItem(ddata).subscribe(res => {
          this.getItemListPaginated(this.ReadAllDTO)
        }
        )
      }
    })

  }

  createITemPrice(itemPrice: CreateItemPriceDTO) {
    this.itemPriceService.CreateItemPrice(itemPrice).subscribe(res => {
      this.getItemListPaginated(this.ReadAllDTO);
      this.ItemPriceForm.reset();
      this.addItemModal.close();
      this.loader.disable();
    });
  }

  submitItemForm() {
    let formData = { ...this.ItemForm.value }
    this.ItemForm.markAllAsTouched();
    this.ItemPriceForm.markAllAsTouched();
    console.log(this.ItemPriceForm.value);

    if (this.ItemForm.valid && this.ItemPriceForm.valid) {
      if (formData.itemId) {
        let data: UpdateItemDTO = this.ItemForm.value as UpdateItemDTO
        console.log(data);
        this.updateItem(data)
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
        this.createItem(data)
      }
    }
  }
  openItemForm() {
    this.ItemForm.reset()
    this.imageUrl = null
    this.addItemModal = this.modalService.open(this.addItemModalContent, { size: 'lg' })

    this.ItemPriceForm.patchValue({
      itemId: 0,
      actionUser: this.User.userId.toString(),
      cp: 0,
      iP1: 0,
      iP2: 0,
      iP3: 0,
      mrp: 0,
      priceId: 0
    })
  }
  openItemEditForm(item: ItemMaster) {

    this.ItemForm.reset()
    this.ItemPriceForm.reset()
    this.ItemForm.patchValue({
      actionUser: this.User.userId.toString(),
      brandId: item.brandId,
      iCode: item.iCode,
      iDesc: item.iDesc,
      iName: item.iName,
      isActive: item.isActive,
      iSize: item.iSize,
      itemId: item.itemId,
      iType: item.iType,
      moq: item.moq,
      mrpPrinted: item.mrpPrinted,
      packingId: item.packingId
    })

    this.itemPriceService.ReadPriceByItemId({ itemId: item.itemId }).subscribe(res => {
      this.ItemPriceForm.patchValue({
        itemId: res.itemId,
        actionUser: this.User.userId.toString(),
        cp: res.cp,
        iP1: res.iP1,
        iP2: res.iP2,
        iP3: res.iP3,
        mrp: res.mrp,
        priceId: res.priceId
      })
    })

    this.addItemModal = this.modalService.open(this.addItemModalContent, { size: 'lg' })
  }

  openProductDetail(productDetailContent: TemplateRef<any>) {
    if (this.viewProductDetailModal) {
      // If off-canvas is already open, close it
      this.viewProductDetailModal.close();
      this.viewProductDetailModal = null;
    } else {
      // If off-canvas is not open, open it
      this.viewProductDetailModal = this.offcanvasService.open(productDetailContent, {
        position: 'end',
        backdrop: false
      });
    }
  }

  onBrancChange() {
    console.log(this.ItemForm.value);
  }

  validateStepperForm(stepper: MatStepper) {
    let currentForm = stepper.steps.toArray()[stepper.selectedIndex].stepControl
    currentForm.markAllAsTouched()
    if (currentForm.valid) {
      stepper.next()
    }
  }

  imageUrl: string | ArrayBuffer | null = null; // To hold the image URL
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  triggerFileInput() {
    console.log("clicked");
    console.log(this.fileInput);

    if (this.fileInput) {
      this.fileInput.nativeElement.click(); // Programmatically click the file input
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result ?? null; // Ensure that the result is not undefined
      };

      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
    console.log(this.imageUrl);
    
  }

  createItemImage(itemdata: ItemMaster){
    if(this.imageUrl){
      let data:CreateImageDTO = {
        masterId:itemdata.itemId,
        masterType: 0,
        iName: itemdata.iName,
        iType: '',
        iurl: this.imageUrl as string,
        actionUser: this.User.userId.toString(),
        isDefault: 1
      }
      this.imageMasterService.CreateImage(data).subscribe(res=>{
  
      })
    }
  }

  ngOnDestroy() {
    this.viewProductDetailModal?.close()
  }
}
