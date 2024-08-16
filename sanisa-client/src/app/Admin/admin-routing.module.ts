import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    
    path: '', component: NavbarComponent, children: [
      { path:'users', component:UsersComponent, title:'Users'}
    ], title : 'Admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
