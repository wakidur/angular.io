import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutHistoryDialogComponent } from './workout-history-dialog.component';

describe('WorkoutHistoryDialogComponent', () => {
  let component: WorkoutHistoryDialogComponent;
  let fixture: ComponentFixture<WorkoutHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
