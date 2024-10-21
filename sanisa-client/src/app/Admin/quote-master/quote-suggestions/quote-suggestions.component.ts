import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quote-suggestions',
  templateUrl: './quote-suggestions.component.html',
  styleUrls: ['./quote-suggestions.component.css']
})
export class QuoteSuggestionsComponent {


  suggestionForm = new FormGroup({
    eventId : new FormControl(0),
    amount: new FormControl(0),
  })
  loadList(){

  }
}
