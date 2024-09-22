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
import { ComboMasterComponent } from './combo-master/combo-master.component';
import { QuoteMasterComponent } from './quote-master/quote-master.component';
import { QuoteDetailComponent } from './quote-master/quote-detail/quote-detail.component';
import { KitDetailsComponent } from './kit-master/kit-details/kit-details.component';
import { ComboDetailComponent } from './combo-master/combo-detail/combo-detail.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { CategoryDetailComponent } from './category-master/category-detail/category-detail.component';


@NgModule({
  declarations: [
    NavbarComponent,
    UsersComponent,
    BrandMasterComponent,
    ItemMasterComponent,
    PackagingMasterComponent,
    KitMasterComponent,
    ComboMasterComponent,
    QuoteMasterComponent,
    QuoteDetailComponent,
    KitDetailsComponent,
    ComboDetailComponent,
    RoleMasterComponent,
    CategoryMasterComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
