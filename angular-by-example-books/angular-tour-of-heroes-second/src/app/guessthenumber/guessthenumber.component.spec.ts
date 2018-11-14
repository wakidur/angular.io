import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessthenumberComponent } from './guessthenumber.component';

describe('GuessthenumberComponent', () => {
  let component: GuessthenumberComponent;
  let fixture: ComponentFixture<GuessthenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessthenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessthenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
