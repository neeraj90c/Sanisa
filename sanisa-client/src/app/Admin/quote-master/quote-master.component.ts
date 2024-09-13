import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { QuoteMasterService } from './quote-master.service';
import { CreateQuoteDTO, DeleteQuoteDTO, QuoteMasterDTO, UpdateQuoteDTO } from './quote-master.interface';
import { ReadAllDTO } from 'src/app/Common/common.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-quote-master',
  templateUrl: './quote-master.component.html',
  styleUrls: ['./quote-master.component.css']
})
export class QuoteMasterComponent {
openEditquoteForm(_t20: any) {
throw new Error('Method not implemented.');
}
deletequote(_t20: any) {
throw new Error('Method not implemented.');
}
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private quoteMasterServcie = inject(QuoteMasterService)
  @ViewChild('quoteFormTemplate', { static: false }) QuoteFormRef!: ElementRef;
  quoteFormModal!: NgbModalRef;
  QuoteList: QuoteMasterDTO[] = []

  ReadAllDTO: ReadAllDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  };

  QuoteForm = new FormGroup({
    quotId: new FormControl(0),
    qName: new FormControl('', [Validators.required]),
    qCode: new FormControl(''),
    qDesc: new FormControl(''),
    qDate: new FormControl(''),
    qRange: new FormControl(0),
    qMod: new FormControl(0),
    clientId: new FormControl(0),
    qStatus: new FormControl(''),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })
quoteList: any;

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
    this.getQuoteListPaginated(this.ReadAllDTO)
  }






  openQuoteForm() {
    this.QuoteForm.reset()
    this.quoteFormModal = this.modalService.open(this.QuoteFormRef)
  }

  openEditQuoteForm(data: QuoteMasterDTO) {
    this.QuoteForm.reset()
    this.QuoteForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      qCode: data.qCode,
      qDesc: data.qDesc,
      quotId: data.quotId,
      qName: data.qName
    })
    this.quoteFormModal = this.modalService.open(this.QuoteFormRef)
  }





  getQuoteListPaginated(data: ReadAllDTO) {
    this.quoteMasterServcie.ReadAllQuotesPaginated(data).subscribe(res => {
      this.QuoteList = res.items
    })
  }

  createQuote(data: CreateQuoteDTO) {
    this.quoteMasterServcie.CreateQuote(data).subscribe(res => {
      this.getQuoteListPaginated(this.ReadAllDTO)
      this.QuoteForm.reset()
      this.quoteFormModal.close()
    })
  }

  updateQuote(data: UpdateQuoteDTO) {
    this.quoteMasterServcie.UpdateQuote(data).subscribe(res => {
      this.getQuoteListPaginated(this.ReadAllDTO)
      this.QuoteForm.reset()
      this.quoteFormModal.close()
    })
  }

  deleteQuote(data: QuoteMasterDTO) {
    this.confirmModal.openDeleteModal(data.qName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteQuoteDTO = {
          quotId: data.quotId,
          actionUser: this.User.userId.toString()
        }
        this.quoteMasterServcie.DeleteQuote(ddata).subscribe(res => {
          this.getQuoteListPaginated(this.ReadAllDTO)
        }
        )
      }
    })
  }

  submitForm() {
    this.QuoteForm.markAllAsTouched()
    if (this.QuoteForm.valid) {
      if (this.QuoteForm.value.quotId && this.QuoteForm.value.quotId != 0) {
        let formdata = { ...this.QuoteForm.value }
        let data: UpdateQuoteDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          quotId: formdata.quotId as number,
          qCode: formdata.qCode as string,
          qName: formdata.qName as string,
          qDesc: formdata.qDesc as string,
          qDate:  new Date(formatDate(formdata.qDate as string,'en','dd-mm-yyyy')) ,
          qRange: formdata.qRange as number,
          qMod: 0,
          clientId: 0,
          qStatus: ''
        }
        this.updateQuote(data)
      } else {
        let formdata = { ...this.QuoteForm.value }
        let data: CreateQuoteDTO = {
          actionUser: this.User.userId.toString(),
          qCode: formdata.qCode as string,
          qName: formdata.qName as string,
          qDesc: formdata.qDesc as string,
          qStatus: '',
          qDate: new Date(formatDate(formdata.qDate as string,'en','dd-mm-yyyy')),
          qRange: 0,
          qMod: 0,
          clientId: 0
        }
        this.createQuote(data)
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
    this.getQuoteListPaginated(this.ReadAllDTO)
  }
}
