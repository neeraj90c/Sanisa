import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreatePackaging, DeletePackaging, ReadAllPackagings, ReadAllPackagingsPaginated, ReadPackagingById, UpdatePackaging } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreatePackagingDTO, DeletePackagingDTO, PackagingDTO, PackagingList, PackagingReadAllPaginatedDTO, UpdatePackagingDTO } from './packaging-master.interface';

@Injectable({
  providedIn: 'root'
})
export class PackagingMasterService {

  constructor() { }
  private http = inject(HttpClient)

  CreatePackaging(data: CreatePackagingDTO): Observable<PackagingDTO> {
    return this.http.post<PackagingDTO>(CreatePackaging, data)
  }
  UpdatePackaging(data: UpdatePackagingDTO): Observable<PackagingDTO> {
    return this.http.post<PackagingDTO>(UpdatePackaging, data)
  }
  ReadPackagingById(data: { packagingId: number }): Observable<PackagingDTO> {
    return this.http.post<PackagingDTO>(ReadPackagingById, data)
  }
  DeletePackaging(data: DeletePackagingDTO): Observable<void> {
    return this.http.post<void>(DeletePackaging, data)
  }
  ReadAllPackagings(): Observable<PackagingList> {
    return this.http.get<PackagingList>(ReadAllPackagings)
  }

  ReadAllPackagingsPaginated(data: PackagingReadAllPaginatedDTO): Observable<PackagingList> {
    return this.http.post<PackagingList>(ReadAllPackagingsPaginated, data)
  }

}
