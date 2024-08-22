import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { adminGuardGuard } from './Guards/admin-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'SaNiSa - Login' },
  { path: '', loadChildren: () => import('./Sanisa/sanisa.module').then(m => m.SanisaModule) },
  { path: 'admin', loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule), canActivate:[adminGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
