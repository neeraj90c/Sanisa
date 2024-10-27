import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseImageURL } from 'GlobalVariables';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/Common/Authentication/auth.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { CreateEventDetailDTO, DeleteEventDetailDTO } from '../../event-master/event-detail/event-detail.interface';
import { EventDetailService } from '../../event-master/event-detail/event-detail.service';
import { EventMasterService } from '../../event-master/event-master.service';
import { EventMasterDTO } from '../../event-master/event.interface';
import { ItemMaster } from '../../item-master/item-master.interface';
import { ItemMasterService } from '../../item-master/item-master.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit{

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private eventDetailService = inject(EventDetailService)
  private itemMasterService = inject(ItemMasterService)
  private eventMasterService = inject(EventMasterService)
  EventDetail: EventMasterDTO | null = null
  itemFormModal!: NgbModalRef;
  User = inject(AuthService).User()
  confirmModal = inject(ConfirmmodalserviceService)
  private modalService = inject(NgbModal)
  itemList: ItemMaster[] = []
  private searchSubject = new Subject<string>();
  searchTerm: string = '';
  eventItemList: ItemMaster[] = [];

  ngOnInit(): void {
    let currentParams = this.route.snapshot.paramMap.get('id')
    this.getEventDetail(parseInt(currentParams!))

    this.searchSubject.pipe(
      debounceTime(300) // Adjust the debounce time as necessary
    ).subscribe(term => {
      this.searchItemByName(term);
    });
  }

  getItemsByEvent(eventId: number) {
    this.itemMasterService.ReadByEventId({ eventId }).subscribe(res => {
      this.eventItemList = res.items
      this.eventItemList.map(item => {
        if (item.imagePath) {
          item.imagePath = BaseImageURL + item.imagePath; // Update the imagePath
        }
        return item
      });
    })
  }

  getEventDetail(eventId: number) {
    this.eventMasterService.ReadEventById({ eventId }).subscribe(res => {
      this.EventDetail = res
    })
    this.getItemsByEvent(eventId)
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
      this.createItemEvent(item.itemId)
    } else {
     let detail = this.eventItemList.find(i=> i.itemId == item.itemId)
      if(detail){
        this.DeleteEvent(detail.detailId!)
      }
    }

  }

  createItemEvent(itemId: number) {
    let data: CreateEventDetailDTO = {
      itemId: itemId,
      actionUser: this.User.userId.toString(),
      eventId: this.EventDetail?.eventId as number
    }
    this.eventDetailService.CreateEventDetail(data).subscribe(res => {
      this.getItemsByEvent(this.EventDetail?.eventId!)
    })
  }

  DeleteEvent(detailId: number) {
    let data: DeleteEventDetailDTO = {
      actionUser: this.User.userId.toString(),
      eDetailId: detailId
    }
    this.eventDetailService.DeleteEventDetail(data).subscribe(res => {
      this.getItemsByEvent(this.EventDetail?.eventId!)
    })
  }

  deleteItemMapping(item:ItemMaster){
    this.confirmModal.openDeleteModal(item?.iName!, item).subscribe(res => {
      if (res) {
        console.log(res);
        this.DeleteEvent(item.detailId)
      } else {
        console.log('no res');
      }
    })
  }

  checkBoxChecked(item:ItemMaster):boolean{
    let eItem = this.eventItemList.find(i=>i.itemId == item.itemId)
    return eItem ? true : false
  }
}
