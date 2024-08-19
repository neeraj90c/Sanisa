import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanisaRoutingModule } from './sanisa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    SanisaRoutingModule,
    SharedModule
  ]
})
export class SanisaModule { }
