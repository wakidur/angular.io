import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWiseResourcePermissionComponent } from './role-wise-resource-permission.component';

describe('RoleWiseResourcePermissionComponent', () => {
  let component: RoleWiseResourcePermissionComponent;
  let fixture: ComponentFixture<RoleWiseResourcePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleWiseResourcePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleWiseResourcePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
