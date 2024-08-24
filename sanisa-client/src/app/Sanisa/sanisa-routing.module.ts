import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    
    path: '', component: NavbarComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'store', component: StoreComponent, title: 'Store' },
      { path: 'product-detail', component: ProductDetailsComponent, title: 'Product Detail' },
      {path: 'contact', component: ContactComponent, title: 'Contact'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanisaRoutingModule { }
