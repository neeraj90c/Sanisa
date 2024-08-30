import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreComponent } from './store/store.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    
    path: '', component: NavbarComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'store', component: StoreComponent, title: 'Store' },
      { path: 'product-detail', component: ProductDetailsComponent, title: 'Product Detail' },
      {path: 'contact', component: ContactComponent, title: 'Contact'},
      {path: 'testimonial', component: TestimonialComponent, title: 'Contact'},
      {path: 'about', component: AboutUsComponent, title: 'About'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanisaRoutingModule { }
