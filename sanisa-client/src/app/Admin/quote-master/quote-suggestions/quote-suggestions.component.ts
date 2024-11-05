import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuoteMasterService } from '../quote-master.service';
import { QuoteMasterSuggestionsResponse, QuoteSuggestionsReq } from '../quote-master.interface';
import { EventMasterService } from '../../event-master/event-master.service';
import { EventMasterDTO } from '../../event-master/event.interface';
import { nonZeroValidator } from 'src/app/shared/validators/nonZeroValidator';

@Component({
  selector: 'app-quote-suggestions',
  templateUrl: './quote-suggestions.component.html',
  styleUrls: ['./quote-suggestions.component.css']
})
export class QuoteSuggestionsComponent implements OnInit {
  ngOnInit(): void {
    this.getEventList()
  }

  private quoteMasterServcie = inject(QuoteMasterService)
  suggestionItemList: QuoteMasterSuggestionsResponse[] = []
  suggestionMaster: { sugId: number, mrp: number }[] = []
  private eventMasterServcie = inject(EventMasterService)
  eventList: EventMasterDTO[] = []



  suggestionForm = new FormGroup({
    budgetPrice: new FormControl(0, [Validators.required,Validators.min(1)]),
    eventId: new FormControl(0, [Validators.required,Validators.min(1)]),
    numberOfItems: new FormControl(0, [Validators.required,Validators.min(1)]),
    numberOfSuggestions: new FormControl(0, [Validators.required,Validators.min(1)]),
  })
  GetQuotSugestions() {
    console.log(this.suggestionForm.valid);
    
    if (this.suggestionForm.valid) {
      let data: QuoteSuggestionsReq = this.suggestionForm.value as QuoteSuggestionsReq
      this.loading = true
      this.quoteMasterServcie.QuoteSuggestions(data).subscribe({
        next: (res) => {
          const mrpSumMap = res.items.reduce((acc, item) => {
            if (!acc[item.sugId]) {
              acc[item.sugId] = { sugId: item.sugId, mrp: 0 };
            }
            acc[item.sugId].mrp += item.mrp; // Sum the mrp for the same sugId
            return acc;
          }, {} as { [key: number]: { sugId: number; mrp: number } });

          // Convert the map values to an array
          this.suggestionMaster = Object.values(mrpSumMap);
          this.suggestionItemList = res.items
          this.loading = false
        },
        error: () => {
          this.loading = false
        }
      })
    }else {
      this.suggestionForm.markAllAsTouched();
    }
  }
  getItemDetails(sugId: number): QuoteMasterSuggestionsResponse[] {
    return this.suggestionItemList.filter(item => item.sugId == sugId)
  }
  loading: boolean = true;
  getEventList() {
    this.loading = true
    this.eventMasterServcie.ReadAllEvent().subscribe(res => {
      this.eventList = res.items
      this.loading = false
    })
  }
}
