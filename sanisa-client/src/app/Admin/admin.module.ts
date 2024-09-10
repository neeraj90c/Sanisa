import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { BrandMasterComponent } from './brand-master/brand-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { PackagingMasterComponent } from './packaging-master/packaging-master.component';
import { KitMasterComponent } from './kit-master/kit-master.component';


@NgModule({
  declarations: [
    NavbarComponent,
    UsersComponent,
    BrandMasterComponent,
    ItemMasterComponent,
    PackagingMasterComponent,
    KitMasterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
