import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkoutRunnerHeaderComponent } from "./workout-runner-header.component";

describe("WorkoutRunnerHeaderComponent", () => {
  let component: WorkoutRunnerHeaderComponent;
  let fixture: ComponentFixture<WorkoutRunnerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutRunnerHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutRunnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
