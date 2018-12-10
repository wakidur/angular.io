import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavMainComponent } from './sub-nav-main.component';

describe('SubNavMainComponent', () => {
  let component: SubNavMainComponent;
  let fixture: ComponentFixture<SubNavMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubNavMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNavMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
