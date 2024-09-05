import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';
import { BrandMasterComponent } from './brand-master/brand-master.component';
import { ItemMasterComponent } from './item-master/item-master.component';

const routes: Routes = [
  {
    
    path: '', component: NavbarComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path:'users', component:UsersComponent, title:'Users'},
      { path:'manage-brands', component:BrandMasterComponent, title:'Manage Brand'},
      { path:'manage-items', component:ItemMasterComponent, title:'Manage Items'},
    ], title : 'Admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
