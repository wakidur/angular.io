import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshboardContainerComponent } from './deshboard-container.component';

describe('DeshboardContainerComponent', () => {
  let component: DeshboardContainerComponent;
  let fixture: ComponentFixture<DeshboardContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeshboardContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
