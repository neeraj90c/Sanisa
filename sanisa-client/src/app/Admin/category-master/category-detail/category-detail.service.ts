import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateCategoryDetail, UpdateCategoryDetail, ReadCategoryDetailById, ReadDetailByCategoryId, DeleteCategoryDetail, ReadAllCategoryDetail } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CategoryDetailDTO, CategoryDetailList, CreateCategoryDetailDTO, DeleteCategoryDetailDTO, UpdateCategoryDetailDTO } from './category-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailService {

  constructor() { }
  private http = inject(HttpClient)

  CreateCategoryDetail(data: CreateCategoryDetailDTO): Observable<CategoryDetailDTO> {
    return this.http.post<CategoryDetailDTO>(CreateCategoryDetail, data)
  }
  UpdateCategoryDetail(data: UpdateCategoryDetailDTO): Observable<CategoryDetailDTO> {
    return this.http.post<CategoryDetailDTO>(UpdateCategoryDetail, data)
  }
  ReadCategoryDetailById(data: { detailId: number }): Observable<CategoryDetailDTO> {
    return this.http.post<CategoryDetailDTO>(ReadCategoryDetailById, data)
  }
  ReadDetailByCategoryId(data: { categoryId: number }): Observable<CategoryDetailList> {
    return this.http.post<CategoryDetailList>(ReadDetailByCategoryId, data)
  }
  DeleteCategoryDetail(data: DeleteCategoryDetailDTO): Observable<void> {
    return this.http.post<void>(DeleteCategoryDetail, data)
  }
  ReadAllCategoryDetail(): Observable<CategoryDetailList> {
    return this.http.get<CategoryDetailList>(ReadAllCategoryDetail)
  }

}
