import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSuggestionsComponent } from './quote-suggestions.component';

describe('QuoteSuggestionsComponent', () => {
  let component: QuoteSuggestionsComponent;
  let fixture: ComponentFixture<QuoteSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteSuggestionsComponent]
    });
    fixture = TestBed.createComponent(QuoteSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
