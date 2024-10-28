import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateKitDetail, DeleteKitDetail, ReadAllKitDetails, ReadDetailsByKitId, ReadKitByDetailId, UpdateKitDetail } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateKitDetailDTO, DeleteKitDetailDTO, KitDetailsDTO, KitItemList, UpdateKitDetailDTO } from './kit-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class KitDetailsService {

  constructor() { }
  private http = inject(HttpClient)

  CreateKitDetail(data: CreateKitDetailDTO): Observable<KitDetailsDTO> {
    return this.http.post<KitDetailsDTO>(CreateKitDetail, data)
  }
  UpdateKitDetail(data: UpdateKitDetailDTO): Observable<KitDetailsDTO> {
    return this.http.post<KitDetailsDTO>(UpdateKitDetail, data)
  }
  ReadKitByDetailId(data: { detailId: number }): Observable<KitDetailsDTO> {
    return this.http.post<KitDetailsDTO>(ReadKitByDetailId, data)
  }
  ReadDetailsByKitId(data: { kitId: number }): Observable<KitItemList> {
    return this.http.post<KitItemList>(ReadDetailsByKitId, data)
  }
  DeleteKitDetail(data: DeleteKitDetailDTO): Observable<void> {
    return this.http.post<void>(DeleteKitDetail, data)
  }
  ReadAllKitDetails(): Observable<KitItemList> {
    return this.http.get<KitItemList>(ReadAllKitDetails)
  }
}
