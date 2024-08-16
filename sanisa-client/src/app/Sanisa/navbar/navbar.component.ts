import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Common/Authentication/auth.service';

export interface ParentMenu {
  userId: number;
  roleId: number;
  menuId: number;
  parentMenuId: number;
  subRoleId: number;
  subRoleName: string;
  subRoleCode: string;
  subRoleDesc: string;
  displayOrder: number;
  defaultChildMenuId: number;
  menuIconUrl: string;
  templatePath: string;
  isParent: number;
  childrenCount: number;
  childIsParent: number;
  childMenuList?: ParentMenu[];
  projectId: number
}

export interface MenuDataItem {
  items: ParentMenu[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('navbar') navbar: ElementRef | undefined;
  @ViewChild('hamburger') hamburger: ElementRef | undefined;
  private clickListener: () => void;
  renderer: any;
  authService = inject(AuthService)
  Logout() {
    this.authService.SignOutUser()
  }


  constructor() {
    this.clickListener = () => { };
  }
  parentMenu: ParentMenu[] = [
    {
      userId: 0,
      projectId: 0,
      roleId: 369,
      menuId: 1281,
      parentMenuId: 0,
      subRoleId: 473,
      subRoleName: "About Us",
      subRoleCode: "MAD",
      subRoleDesc: "Menu management Single Page",
      displayOrder: 1,
      defaultChildMenuId: 0,
      menuIconUrl: "<i class=\fa fa-th me-2\>",
      templatePath: "/html/admin/manageMenu.html",
      isParent: 1,
      childrenCount: 1,
      childIsParent: 0
    },
    {
      userId: 0,
      projectId: 0,
      roleId: 369,
      menuId: 1281,
      parentMenuId: 0,
      subRoleId: 473,
      subRoleName: "Contact Us",
      subRoleCode: "MAD",
      subRoleDesc: "Menu management Single Page",
      displayOrder: 1,
      defaultChildMenuId: 0,
      menuIconUrl: "<i class=\fa fa-th me-2\>",
      templatePath: "/html/admin/manageMenu.html",
      isParent: 1,
      childrenCount: 1,
      childIsParent: 0
    },
    {
      userId: 0,
      projectId: 0,
      roleId: 369,
      menuId: 1281,
      parentMenuId: 0,
      subRoleId: 473,
      subRoleName: "Client",
      subRoleCode: "MAD",
      subRoleDesc: "Menu management Single Page",
      displayOrder: 1,
      defaultChildMenuId: 0,
      menuIconUrl: "<i class=\fa fa-th me-2\>",
      templatePath: "/html/admin/manageMenu.html",
      isParent: 1,
      childrenCount: 1,
      childIsParent: 0
    },
    {
      userId: 0,
      projectId: 0,
      roleId: 369,
      menuId: 1281,
      parentMenuId: 0,
      subRoleId: 473,
      subRoleName: "Testimonial",
      subRoleCode: "MAD",
      subRoleDesc: "Menu management Single Page",
      displayOrder: 1,
      defaultChildMenuId: 0,
      menuIconUrl: "<i class=\fa fa-th me-2\>",
      templatePath: "/html/admin/manageMenu.html",
      isParent: 1,
      childrenCount: 1,
      childIsParent: 0
    },

  ]

  ngAfterViewInit() {
    this.clickListener = this.renderer.listen('document', 'click', this.handleDocumentClick.bind(this));
  }

  toggleNav(): void {

    if (this.navbar) {
      this.navbar.nativeElement.classList.toggle('active');
    }
    if (this.hamburger) {
      this.hamburger.nativeElement.classList.toggle('hamburger-active');
    }
  }

  handleDocumentClick(event: Event): void {
    if (this.navbar && this.hamburger) {
      const targetElement = event.target as HTMLElement;
      if (!this.navbar.nativeElement.contains(targetElement) && !this.hamburger.nativeElement.contains(targetElement)) {
        this.navbar.nativeElement.classList.remove('active');
        this.hamburger.nativeElement.classList.remove('hamburger-active');
      }
    }
  }

}
