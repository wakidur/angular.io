import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavMainComponent } from './left-nav-main.component';

describe('LeftNavMainComponent', () => {
  let component: LeftNavMainComponent;
  let fixture: ComponentFixture<LeftNavMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftNavMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
