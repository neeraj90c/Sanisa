import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanisaRoutingModule } from './sanisa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './user/navbar/navbar.component';
import { HomeComponent } from './user/home/home.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SanisaRoutingModule,
    SharedModule
  ]
})
export class SanisaModule { }
