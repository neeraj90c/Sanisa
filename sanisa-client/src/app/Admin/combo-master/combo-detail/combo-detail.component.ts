import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-combo-detail',
  templateUrl: './combo-detail.component.html',
  styleUrls: ['./combo-detail.component.css']
})
export class ComboDetailComponent {
  @ViewChild('addComboItem', { static: false }) addComboItemModalContent!: ElementRef;

  addComboItemModal!: NgbModalRef;
  public modalService = inject(NgbModal);

  OpenaddComboItemModal() {
    this.addComboItemModal = this.modalService.open(this.addComboItemModalContent,);
  }

}
