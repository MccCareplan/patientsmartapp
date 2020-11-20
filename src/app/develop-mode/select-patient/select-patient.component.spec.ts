import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPatientComponent } from './select-patient.component';

describe('SelectPatientComponent', () => {
  let component: SelectPatientComponent;
  let fixture: ComponentFixture<SelectPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
