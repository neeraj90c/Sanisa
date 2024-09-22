import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryMasterService } from '../category-master.service';
import { CategoryMasterDTO } from '../category.interface';
import { CategoryDetailService } from './category-detail.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private categoryDetailService = inject(CategoryDetailService)
  private categoryMasterService = inject(CategoryMasterService)
  CategoryDetail!: CategoryMasterDTO

  ngOnInit(): void {
    let currentParams = this.route.snapshot.paramMap.get('id')
    this.getCategoryDetail(parseInt(currentParams!))
  }

  getCategoryDetail(categoryId: number) {
    this.categoryMasterService.ReadCategoryById({ categoryId }).subscribe(res => {
      this.CategoryDetail = res
    })
    // this.categoryDetailService.ReadCategoryDetailById({ detailId }).subscribe(res => {
    //   this.CategoryDetail = res
    // })
  }

}
