import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfResourceComponent } from './list-of-resource.component';

describe('ListOfResourceComponent', () => {
  let component: ListOfResourceComponent;
  let fixture: ComponentFixture<ListOfResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
