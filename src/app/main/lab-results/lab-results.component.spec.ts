import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabResultsComponent } from './lab-results.component';

describe('LabResultsComponent', () => {
  let component: LabResultsComponent;
  let fixture: ComponentFixture<LabResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabResultsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
