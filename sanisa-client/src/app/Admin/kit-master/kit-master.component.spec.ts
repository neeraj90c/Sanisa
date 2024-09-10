import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitMasterComponent } from './kit-master.component';

describe('KitMasterComponent', () => {
  let component: KitMasterComponent;
  let fixture: ComponentFixture<KitMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitMasterComponent]
    });
    fixture = TestBed.createComponent(KitMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
