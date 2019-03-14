import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageWorkoutComponent } from './local-storage-workout.component';

describe('LocalStorageWorkoutComponent', () => {
  let component: LocalStorageWorkoutComponent;
  let fixture: ComponentFixture<LocalStorageWorkoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStorageWorkoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStorageWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
