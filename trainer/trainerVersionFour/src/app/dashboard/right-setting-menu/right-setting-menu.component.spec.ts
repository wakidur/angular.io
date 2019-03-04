import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSettingMenuComponent } from './right-setting-menu.component';

describe('RightSettingMenuComponent', () => {
  let component: RightSettingMenuComponent;
  let fixture: ComponentFixture<RightSettingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightSettingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightSettingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
