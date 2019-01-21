import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavMainComponent } from './top-nav-main.component';

describe('TopNavMainComponent', () => {
  let component: TopNavMainComponent;
  let fixture: ComponentFixture<TopNavMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
