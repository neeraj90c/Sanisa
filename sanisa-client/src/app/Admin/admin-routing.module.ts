import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
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
import { EventMasterComponent } from './event-master/event-master.component';
import { EventDetailComponent } from './event-master/event-detail/event-detail.component';

const routes: Routes = [
  {

    path: '', component: NavbarComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent, title: 'Users' },
      { path: 'brands', component: BrandMasterComponent, title: 'Manage Brand' },
      { path: 'items', component: ItemMasterComponent, title: 'Manage Items' },
      { path: 'packaging', component: PackagingMasterComponent, title: 'Manage Packaging' },
      { path: 'kit', component: KitMasterComponent, title: 'Manage Kit' },
      { path: 'kit/:id', component: KitDetailsComponent, title: 'Kit Details' },
      { path: 'combo', component: ComboMasterComponent, title: 'Manage Combos' },
      { path: 'combo/:id', component: ComboDetailComponent, title: 'Combo Details' },
      { path: 'quote', component: QuoteMasterComponent, title: 'Manage Quotes' },
      { path: 'quote/:id', component: QuoteDetailComponent, title: 'Quote Detail' },
      { path: 'roles', component: RoleMasterComponent, title: 'Manage Role' },
      { path: 'category', component: CategoryMasterComponent, title: 'Manage Categories' },
      { path: 'category/:id', component: CategoryDetailComponent, title: 'Category Detail' },
      { path: 'event', component: EventMasterComponent, title: 'Manage Event' },
      { path: 'event/:id', component: EventDetailComponent, title: 'Event Detail' },
    ], title: 'Admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
