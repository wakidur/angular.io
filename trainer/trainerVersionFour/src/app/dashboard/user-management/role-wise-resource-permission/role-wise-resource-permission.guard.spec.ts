import { TestBed, async, inject } from '@angular/core/testing';

import { RoleWiseResourcePermissionGuard } from './role-wise-resource-permission.guard';

describe('RoleWiseResourcePermissionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleWiseResourcePermissionGuard]
    });
  });

  it('should ...', inject([RoleWiseResourcePermissionGuard], (guard: RoleWiseResourcePermissionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
