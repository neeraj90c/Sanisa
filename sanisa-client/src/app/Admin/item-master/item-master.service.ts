import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateItem, DeleteItem, ReadAllItems, ReadAllItemsPaginated, ReadByCategoryId, ReadByEventId, ReadItemByComboId, ReadItemById, ReadItemByKitId, SearchItemByName, UpdateItem } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateItemDTO, DeleteItemDTO, ItemList, ItemMaster, ReadAllItemsPaginatedDTO, UpdateItemDTO } from './item-master.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemMasterService {

  constructor() { }

  private http = inject(HttpClient)

  ReadAllItems(): Observable<ItemList> {
    return this.http.get<ItemList>(ReadAllItems)
  }

  ReadAllItemsPaginated(data: ReadAllItemsPaginatedDTO): Observable<ItemList> {
    return this.http.post<ItemList>(ReadAllItemsPaginated, data)
  }

  CreateItem(data: CreateItemDTO): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(CreateItem, data)
  }


  UpdateItem(data: UpdateItemDTO): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(UpdateItem, data)
  }

  ReadItemById(data: { itemId: number }): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(ReadItemById, data)
  }

  ReadItemByKitId(data: { kitId: number }): Observable<ItemList> {
    return this.http.post<ItemList>(ReadItemByKitId, data)
  }

  DeleteItem(data: DeleteItemDTO): Observable<void> {
    return this.http.post<void>(DeleteItem, data)
  }

  SearchItemByName(data: { searchTerm: string }): Observable<ItemList> {
    return this.http.post<ItemList>(SearchItemByName, data)
  }
  ReadByCategoryId(data: { categoryId: number }): Observable<ItemList> {
    return this.http.post<ItemList>(ReadByCategoryId, data)
  }
  ReadByEventId(data: { eventId: number }): Observable<ItemList> {
    return this.http.post<ItemList>(ReadByEventId, data)
  }

  ReadItemByComboId(data: { comboId: number }): Observable<ItemList> {
    return this.http.post<ItemList>(ReadItemByComboId, data)
  }

}
