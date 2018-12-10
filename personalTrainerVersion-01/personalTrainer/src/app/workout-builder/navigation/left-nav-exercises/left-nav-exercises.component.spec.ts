import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavExercisesComponent } from './left-nav-exercises.component';

describe('LeftNavExercisesComponent', () => {
  let component: LeftNavExercisesComponent;
  let fixture: ComponentFixture<LeftNavExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
