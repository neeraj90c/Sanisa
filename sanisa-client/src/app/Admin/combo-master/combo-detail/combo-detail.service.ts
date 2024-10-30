import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ComboDetailsDTO, ComboItemList, CreateComboDetailDTO, DeleteComboDetailDTO, UpdateComboDetailDTO } from './combo-detail.interface';
import { Observable } from 'rxjs';
import { CreateComboDetail, DeleteComboDetail, ReadAllComboDetails, ReadComboByDetailId, ReadDetailsByComboId, UpdateComboDetail } from 'GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class ComboDetailService {

  constructor() { }
  private http = inject(HttpClient)

  CreateComboDetail(data: CreateComboDetailDTO): Observable<ComboDetailsDTO> {
    return this.http.post<ComboDetailsDTO>(CreateComboDetail, data)
  }
  UpdateComboDetail(data: UpdateComboDetailDTO): Observable<ComboDetailsDTO> {
    return this.http.post<ComboDetailsDTO>(UpdateComboDetail, data)
  }
  ReadComboByDetailId(data: { detailId: number }): Observable<ComboDetailsDTO> {
    return this.http.post<ComboDetailsDTO>(ReadComboByDetailId, data)
  }
  ReadDetailsByComboId(data: { comboId: number }): Observable<ComboItemList> {
    return this.http.post<ComboItemList>(ReadDetailsByComboId, data)
  }
  DeleteComboDetail(data: DeleteComboDetailDTO): Observable<void> {
    return this.http.post<void>(DeleteComboDetail, data)
  }
  ReadAllComboDetails(): Observable<ComboItemList> {
    return this.http.get<ComboItemList>(ReadAllComboDetails)
  }
}
