import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateBrand, DeleteBrand, ReadAllBrands, ReadAllBrandsPaginated, ReadBrandById, UpdateBrand } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { BrandList, BrandMasterDTO, CreateBrandDTO, DeleteBrandDTO, ReadAllBrandsPaginatedDTO, UpdateBrandDTO } from './brand-master.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandMasterService {

  constructor() { }
  private http = inject(HttpClient)

  ReadAllBrands(): Observable<BrandList> {
    return this.http.get<BrandList>(ReadAllBrands)
  }

  ReadAllBrandsPaginated(data: ReadAllBrandsPaginatedDTO): Observable<BrandList> {
    return this.http.post<BrandList>(ReadAllBrandsPaginated, data)
  }

  CreateBrand(data: CreateBrandDTO): Observable<BrandMasterDTO> {
    return this.http.post<BrandMasterDTO>(CreateBrand, data)
  }

  UpdateBrand(data: UpdateBrandDTO): Observable<BrandMasterDTO> {
    return this.http.post<BrandMasterDTO>(UpdateBrand, data)
  }

  ReadBrandById(data: { brandId: number }): Observable<BrandMasterDTO> {
    return this.http.get<BrandMasterDTO>(ReadBrandById)
  }

  DeleteBrand(data: DeleteBrandDTO): Observable<void> {
    return this.http.post<void>(DeleteBrand,data)
  }

}
