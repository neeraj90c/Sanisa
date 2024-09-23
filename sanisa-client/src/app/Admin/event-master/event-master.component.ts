import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { environment } from 'src/environments/environment';
import { EventMasterService } from './event-master.service';
import { EventMasterDTO, CreateEventDTO, DeleteEventDTO, UpdateEventDTO } from './event.interface';

@Component({
  selector: 'app-event-master',
  templateUrl: './event-master.component.html',
  styleUrls: ['./event-master.component.css']
})
export class EventMasterComponent {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  private confirmModal = inject(ConfirmmodalserviceService)
  private User = inject(AuthService).User()
  private eventMasterServcie = inject(EventMasterService)
  @ViewChild('eventForm', { static: false }) eventFormRef!: ElementRef;
  eventFormModal!: NgbModalRef;
  eventList: EventMasterDTO[] = []
  COMPANY_ID = environment.COMPANY_CODE

  EventForm = new FormGroup({
    eventId: new FormControl(0),
    eventCode: new FormControl(''),
    eventName: new FormControl('', [Validators.required]),
    eventDesc: new FormControl(''),
    companyId: new FormControl(0),
    isActive: new FormControl(0),
    actionUser: new FormControl('')
  })
  loading: boolean = true;

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
    this.getEventList()
  }






  openEventForm() {
    this.EventForm.reset()
    this.eventFormModal = this.modalService.open(this.eventFormRef)
  }

  openEditEventForm(data: EventMasterDTO) {
    this.EventForm.reset()
    this.EventForm.patchValue({
      actionUser: this.User.userId.toString(),
      isActive: data.isActive,
      eventCode: data.eventCode,
      eventDesc: data.eventDesc,
      eventId: data.eventId,
      eventName: data.eventName,
      companyId: parseInt(this.COMPANY_ID)
    })
    this.eventFormModal = this.modalService.open(this.eventFormRef)
  }





  getEventList() {
    this.loading = true
    this.eventMasterServcie.ReadAllEvent().subscribe(res => {
      this.eventList = res.items
      this.loading = false
    })
  }

  createEvent(data: CreateEventDTO) {
    this.eventMasterServcie.CreateEvent(data).subscribe(res => {
      this.getEventList()
      this.EventForm.reset()
      this.eventFormModal.close()
    })
  }

  updateEvent(data: UpdateEventDTO) {
    this.eventMasterServcie.UpdateEvent(data).subscribe(res => {
      this.getEventList()
      this.EventForm.reset()
      this.eventFormModal.close()
    })
  }

  deleteEvent(data: EventMasterDTO) {
    this.confirmModal.openDeleteModal(data.eventName, data).subscribe(res => {
      if (res) {
        let ddata: DeleteEventDTO = {
          eventId: data.eventId,
          actionUser: this.User.userId.toString()
        }
        this.eventMasterServcie.DeleteEvent(ddata).subscribe(res => {
          this.getEventList()
        }
        )
      }
    })
  }

  submitForm() {
    this.EventForm.markAllAsTouched()
    if (this.EventForm.valid) {
      if (this.EventForm.value.eventId && this.EventForm.value.eventId != 0) {
        let formdata = { ...this.EventForm.value }
        let data: UpdateEventDTO = {
          actionUser: this.User.userId.toString(),
          isActive: 1,
          eventId: formdata.eventId as number,
          eventCode: formdata.eventCode as string,
          eventName: formdata.eventName as string,
          eventDesc: formdata.eventDesc as string,
          companyId: parseInt(this.COMPANY_ID)
        }
        this.updateEvent(data)
      } else {
        let formdata = { ...this.EventForm.value }
        let data: CreateEventDTO = {
          actionUser: this.User.userId.toString(),
          eventCode: formdata.eventCode as string,
          eventName: formdata.eventName as string,
          eventDesc: formdata.eventDesc as string,
          companyId: parseInt(this.COMPANY_ID)
        }
        this.createEvent(data)
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
  //   this.getEventList()
  // }
}
