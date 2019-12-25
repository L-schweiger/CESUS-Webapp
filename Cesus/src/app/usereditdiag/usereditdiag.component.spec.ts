import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsereditdiagComponent } from './usereditdiag.component';

describe('UsereditdiagComponent', () => {
  let component: UsereditdiagComponent;
  let fixture: ComponentFixture<UsereditdiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsereditdiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsereditdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
