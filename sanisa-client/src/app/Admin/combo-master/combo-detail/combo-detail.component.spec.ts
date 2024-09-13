import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboDetailComponent } from './combo-detail.component';

describe('ComboDetailComponent', () => {
  let component: ComboDetailComponent;
  let fixture: ComponentFixture<ComboDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboDetailComponent]
    });
    fixture = TestBed.createComponent(ComboDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
