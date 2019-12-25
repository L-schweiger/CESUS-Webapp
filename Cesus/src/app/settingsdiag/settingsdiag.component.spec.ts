import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsdiagComponent } from './settingsdiag.component';

describe('SettingsdiagComponent', () => {
  let component: SettingsdiagComponent;
  let fixture: ComponentFixture<SettingsdiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsdiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
