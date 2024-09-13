import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { PaginationComponent } from './pagination/pagination.component';
import { MatSliderModule } from '@angular/material/slider';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './loader/loader.component';
import { PageHeaderComponent } from './page-header/page-header.component';




@NgModule({
  declarations: [
    PaginationComponent,
    LoaderComponent,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatSliderModule,
    NgbPopover
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    PaginationComponent,
    MatSliderModule,
    NgbPopover,
    LoaderComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
