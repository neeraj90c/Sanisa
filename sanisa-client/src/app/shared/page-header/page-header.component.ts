import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  @Input() Heading: string = 'Insert Page Heading'
  @Input() Description: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae.'
}
