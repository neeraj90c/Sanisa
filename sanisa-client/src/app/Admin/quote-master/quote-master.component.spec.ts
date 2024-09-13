import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteMasterComponent } from './quote-master.component';

describe('QuoteMasterComponent', () => {
  let component: QuoteMasterComponent;
  let fixture: ComponentFixture<QuoteMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteMasterComponent]
    });
    fixture = TestBed.createComponent(QuoteMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
