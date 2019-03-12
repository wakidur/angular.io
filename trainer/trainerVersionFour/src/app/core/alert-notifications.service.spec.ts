import { TestBed } from '@angular/core/testing';

import { AlertNotificationsService } from './alert-notifications.service';

describe('AlertNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertNotificationsService = TestBed.get(AlertNotificationsService);
    expect(service).toBeTruthy();
  });
});
