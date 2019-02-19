import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutRunnerFooterComponent } from './workout-runner-footer.component';

describe('WorkoutRunnerFooterComponent', () => {
  let component: WorkoutRunnerFooterComponent;
  let fixture: ComponentFixture<WorkoutRunnerFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutRunnerFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRunnerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
