import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjazButtonComponent } from './ajaz-button.component';

describe('AjazButtonComponent', () => {
  let component: AjazButtonComponent;
  let fixture: ComponentFixture<AjazButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjazButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjazButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
