import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitDetailsComponent } from './kit-details.component';

describe('KitDetailsComponent', () => {
  let component: KitDetailsComponent;
  let fixture: ComponentFixture<KitDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitDetailsComponent]
    });
    fixture = TestBed.createComponent(KitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
