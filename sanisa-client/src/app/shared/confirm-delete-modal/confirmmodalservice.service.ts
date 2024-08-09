import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmmodalserviceService {
  private notificationName: string = ''
  private data = {}

  constructor() { }


  public openDeleteModal(name: string, data: any): Observable<any> {
    const decisionSubject = new BehaviorSubject<any>(null);
    Swal.fire({
      title: `Are you sure, you want to delete ${name} ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((res) => {
      if (res.value) {
        decisionSubject.next(data); // User confirmed, emit the data
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        decisionSubject.next(null); // User canceled, emit null
      } else {
        decisionSubject.next(null); // Handle other dismissals (optional)
      }

      decisionSubject.complete();
    })
    return decisionSubject.asObservable();
  }

  public openConfirmationModal(title: string, context: string, data: any): Observable<any> {
    const decisionSubject = new BehaviorSubject<any>(null);
    Swal.fire({
      title: title,
      text: context,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: data
    }).then((res) => {
      if (res.value) {
        decisionSubject.next(data); // User confirmed, emit the data
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        decisionSubject.next(null); // User canceled, emit null
      } else {
        decisionSubject.next(null); // Handle other dismissals (optional)
      }

      decisionSubject.complete();
    })
    return decisionSubject.asObservable();
  }

  public openSwalModal(title:string,text: string,type:SweetAlertIcon | undefined){
    Swal.fire({
      title: title,
      text: text,
      icon: type
    })
    
  }

}
