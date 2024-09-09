import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingMasterComponent } from './packaging-master.component';

describe('PackagingMasterComponent', () => {
  let component: PackagingMasterComponent;
  let fixture: ComponentFixture<PackagingMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagingMasterComponent]
    });
    fixture = TestBed.createComponent(PackagingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
