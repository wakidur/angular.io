import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalStorageWorkoutContainerComponent } from './local-storage-workout-container.component';

describe('LocalStorageWorkoutContainerComponent', () => {
  let component: LocalStorageWorkoutContainerComponent;
  let fixture: ComponentFixture<LocalStorageWorkoutContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalStorageWorkoutContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalStorageWorkoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
