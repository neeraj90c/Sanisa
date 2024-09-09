import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PackagingMasterService } from './packaging-master.service';
import { PackagingDTO, PackagingReadAllPaginatedDTO } from './packaging-master.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-packaging-master',
  templateUrl: './packaging-master.component.html',
  styleUrls: ['./packaging-master.component.css']
})
export class PackagingMasterComponent implements OnInit {

  
  private pmService = inject(PackagingMasterService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private modalService = inject(NgbModal)
  @ViewChild('packageForm', { static: false }) packageFormRef!: ElementRef;
  packageFormModal!: NgbModalRef;

  ReadAllDTO: PackagingReadAllPaginatedDTO = {
    rowNum: 0,
    totalCount: 0,
    whereClause: '',
    orderByClause: '',
    pageSize: 10,
    pageNo: 1
  };

  PackageList: PackagingDTO[] = [];



  ngOnInit(): void {
    let currentParams = this.route.snapshot.queryParams
    if (Object.keys(currentParams).length === 0) {
      this.router.navigate(['.'], {
        queryParams: { pageNo: this.ReadAllDTO.pageNo, pageSize: this.ReadAllDTO.pageSize },
        relativeTo: this.route,
        replaceUrl: true // Replaces the current URL in the history
      })
    } else {
      this.ReadAllDTO.pageSize = currentParams['pageSize']
      this.ReadAllDTO.pageNo = currentParams['pageNo']

    }
    this.getPackageListPaginated(this.ReadAllDTO)
  }

  
  openPackagingForm() {
    this.packageFormModal = this.modalService.open(this.packageFormRef)
  }


  deletePackage() {
  }



  getPackageListPaginated(ReadAllDTO: PackagingReadAllPaginatedDTO) {
    this.pmService.ReadAllPackagingsPaginated(ReadAllDTO).subscribe(res => {
      this.PackageList = res.items
    })
  }






  handlePageSizeChange(e: { currentPage: number; pageSize: number; }) {
    this.ReadAllDTO.pageNo = e.currentPage
    this.ReadAllDTO.pageSize = e.pageSize

    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { pageNo: this.ReadAllDTO.pageNo, pageSize: this.ReadAllDTO.pageSize },
      queryParamsHandling: 'merge', // Use 'merge' to merge with existing query parameters
    });
    this.getPackageListPaginated(this.ReadAllDTO)
  }


}
