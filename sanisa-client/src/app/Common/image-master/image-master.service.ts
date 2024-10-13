import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateImage, DeleteImage, ReadAllImage, ReadImageById, ReadImageByMasterId, UpdateImage } from 'GlobalVariables';
import { Observable } from 'rxjs';
import { CreateImageDTO, DeleteImageDTO, ImageListDTO, ImageMasterDTO, ReadByMasterIdDTO, UpdateImageDTO } from './image-master.interface';

@Injectable({
  providedIn: 'root'
})
export class ImageMasterService {

  constructor() { }

  private http = inject(HttpClient)

  CreateImage(data: CreateImageDTO): Observable<ImageMasterDTO> {
    return this.http.post<ImageMasterDTO>(CreateImage, data)
  }
  UpdateImage(data: UpdateImageDTO): Observable<ImageMasterDTO> {
    return this.http.post<ImageMasterDTO>(UpdateImage, data)
  }
  ReadImageById(data: { imageId: number }): Observable<ImageMasterDTO> {
    return this.http.post<ImageMasterDTO>(ReadImageById, data)
  }
  ReadImageByMasterId(data: ReadByMasterIdDTO): Observable<ImageListDTO> {
    return this.http.post<ImageListDTO>(ReadImageByMasterId, data)
  }
  DeleteImage(data: DeleteImageDTO): Observable<void> {
    return this.http.post<void>(DeleteImage, data)
  }
  ReadAllImage(): Observable<ImageListDTO> {
    return this.http.get<ImageListDTO>(ReadAllImage)
  }
}


