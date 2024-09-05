import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe(res => {
      this.isLoading = res
    })
  }


  isLoading = false

}
