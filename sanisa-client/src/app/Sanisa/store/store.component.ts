import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  @ViewChild('quickView', { static: false }) quickViewModalContent!: ElementRef;
  quickViewModal!: NgbModalRef;
  public modalService = inject(NgbModal)
  OpenquickViewModal() {
    console.log('enter');
    this.quickViewModal = this.modalService.open(this.quickViewModalContent, { size: 'lg' });
  }
  
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
