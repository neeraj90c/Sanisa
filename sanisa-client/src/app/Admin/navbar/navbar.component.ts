import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isSidebarClosed: boolean = false;

  @ViewChild('sidebar', { static: true }) sidebar!: ElementRef;

  ngOnInit(): void {
    // Initially set the sidebar to be open
    this.isSidebarClosed = false;
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleMenu(event: Event): void {
    const arrowParent = (event.target as HTMLElement).closest('li'); // Select the closest parent <li> element
    arrowParent?.classList.toggle('showMenu');
  }
}
