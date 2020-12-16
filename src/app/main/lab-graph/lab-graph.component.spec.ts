import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabGraphComponent } from './lab-graph.component';


describe('LabGraphComponent', () => {
  let component: LabGraphComponent;
  let fixture: ComponentFixture<LabGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabGraphComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
