import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboList, ComboMasterDTO, CreateComboDTO, DeleteComboDTO, UpdateComboDTO } from './combo-master.interface';
import { CreateProductCombo, DeleteProductCombo, ReadAllProductCombos, ReadComboByComboId, UpdateProductCombo, ReadAllProductCombosPaginated } from 'GlobalVariables';
import { ReadAllDTO } from 'src/app/Common/common.interface';

@Injectable({
  providedIn: 'root'
})
export class ComboMasterService {

  constructor() { }
  private http = inject(HttpClient)

  CreateProductCombo(data: CreateComboDTO): Observable<ComboMasterDTO> {
    return this.http.post<ComboMasterDTO>(CreateProductCombo, data);
  }
  UpdateProductCombo(data: UpdateComboDTO): Observable<ComboMasterDTO> {
    return this.http.post<ComboMasterDTO>(UpdateProductCombo, data)
  }
  ReadComboByComboId(data: { comboId: number }): Observable<ComboMasterDTO> {
    return this.http.post<ComboMasterDTO>(ReadComboByComboId, data)
  }
  DeleteProductCombo(data: DeleteComboDTO): Observable<void> {
    return this.http.post<void>(DeleteProductCombo, data)
  }
  ReadAllProductCombos(): Observable<ComboList> {
    return this.http.get<ComboList>(ReadAllProductCombos)
  }
  ReadAllProductCombosPaginated(data:ReadAllDTO): Observable<ComboList> {
    return this.http.post<ComboList>(ReadAllProductCombosPaginated,data)
  }
}
