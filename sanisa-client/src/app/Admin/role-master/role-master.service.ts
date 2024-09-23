import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateRole, DeleteRole, GetDictionaryRole, ReadAllPaginatedRole, UpdateRole } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { DictionaryListDTO, ReadAllDTO } from 'src/app/Common/common.interface';
import { CreateRoleDTO, DeleteRoleDTO, RoleListDTO, RoleMasterDTO, UpdateRoleDTO } from './role-master.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleMasterService {

  constructor() { }

  private http = inject(HttpClient)

  CreateRole(data: CreateRoleDTO): Observable<RoleMasterDTO> {
    return this.http.post<RoleMasterDTO>(CreateRole, data)
  }
  UpdateRole(data: UpdateRoleDTO): Observable<RoleMasterDTO> {
    return this.http.post<RoleMasterDTO>(UpdateRole, data)
  }
  DeleteRole(data: DeleteRoleDTO): Observable<void> {
    return this.http.post<void>(DeleteRole, data)
  }
  GetDictionaryRole(): Observable<DictionaryListDTO> {
    return this.http.get<DictionaryListDTO>(GetDictionaryRole)
  }
  ReadAllPaginatedRole(data: ReadAllDTO): Observable<RoleListDTO> {
    return this.http.post<RoleListDTO>(ReadAllPaginatedRole, data)
  }
}
