import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateItemPriceDTO, DeleteItemPriceDTO, ItemPriceDTO, ItemPriceList, ReadItemPriceByIdDTO, ReadItemPriceByItemIdDTO, UpdateItemPriceDTO } from './item-price.interface';
import { CreateItemPrice, DeleteItemPrice, ReadAllItemPrices, ReadPriceByItemId, ReadPriceByPriceId, UpdateItemPrice } from 'GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class ItemPriceService {

  constructor() { }
  private http = inject(HttpClient)

  ReadAllItemPrices(): Observable<ItemPriceList> {
    return this.http.get<any>(ReadAllItemPrices)
  }
  CreateItemPrice(data: CreateItemPriceDTO): Observable<ItemPriceDTO> {
    return this.http.post<ItemPriceDTO>(CreateItemPrice, data)
  }
  UpdateItemPrice(data: UpdateItemPriceDTO): Observable<ItemPriceDTO> {
    return this.http.post<ItemPriceDTO>(UpdateItemPrice, data)
  }
  ReadPriceByPriceId(data: ReadItemPriceByIdDTO): Observable<ItemPriceDTO> {
    return this.http.post<ItemPriceDTO>(ReadPriceByPriceId, data)
  }
  ReadPriceByItemId(data: ReadItemPriceByItemIdDTO): Observable<ItemPriceDTO> {
    return this.http.post<ItemPriceDTO>(ReadPriceByItemId, data)
  }
  DeleteItemPrice(data: DeleteItemPriceDTO): Observable<void> {
    return this.http.post<void>(DeleteItemPrice, data)
  }

}
