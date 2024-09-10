import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateKitDTO, DeleteKitDTO, KitList, KitMasterDTO, ReadAllKitPaginatedDTO, UpdateKitDTO } from './kit-master.interface';
import { CreateKit, DeleteKit, ReadAllKit, ReadAllKitPaginated, ReadKitByKitId, UpdateKit } from 'GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class KitMasterService {

  constructor() { }
  private http = inject(HttpClient)


  CreateKit(data: CreateKitDTO): Observable<KitMasterDTO> {
    return this.http.post<KitMasterDTO>(CreateKit, data)
  }
  UpdateKit(data: UpdateKitDTO): Observable<KitMasterDTO> {
    return this.http.post<KitMasterDTO>(UpdateKit, data)
  }
  ReadKitByKitId(data: { kitId: number }): Observable<KitMasterDTO> {
    return this.http.post<KitMasterDTO>(ReadKitByKitId, data)
  }
  DeleteKit(data: DeleteKitDTO): Observable<void> {
    return this.http.post<void>(DeleteKit, data)
  }
  ReadAllKit(): Observable<KitList> {
    return this.http.get<KitList>(ReadAllKit)
  }
  ReadAllKitPaginated(data: ReadAllKitPaginatedDTO): Observable<KitList> {
    return this.http.post<KitList>(ReadAllKitPaginated, data)
  }

}
