import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './admin/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'SaNiSa - Login' },
  { path: '', loadChildren: () => import('./Sanisa/sanisa.module').then(m => m.SanisaModule)},
  { path: 'admin',component:NavbarComponent, title:'admin-home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
