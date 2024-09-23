import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateCategory, UpdateCategory, ReadCategoryById, DeleteCategory, ReadAllCategory } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CategoryList, CategoryMasterDTO, CreateCategoryDTO, DeleteCategoryDTO, UpdateCategoryDTO } from './category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryMasterService {

  constructor() { }
  private http = inject(HttpClient)


  CreateCategory(data: CreateCategoryDTO): Observable<CategoryMasterDTO> {
    return this.http.post<CategoryMasterDTO>(CreateCategory, data)
  }
  UpdateCategory(data: UpdateCategoryDTO): Observable<CategoryMasterDTO> {
    return this.http.post<CategoryMasterDTO>(UpdateCategory, data)
  }
  ReadCategoryById(data: { categoryId: number }): Observable<CategoryMasterDTO> {
    return this.http.post<CategoryMasterDTO>(ReadCategoryById, data)
  }
  DeleteCategory(data: DeleteCategoryDTO): Observable<any> {
    return this.http.post<any>(DeleteCategory, data)
  }
  ReadAllCategory(): Observable<CategoryList> {
    return this.http.get<CategoryList>(ReadAllCategory)
  }
}
