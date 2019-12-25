import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseeditdiagComponent } from './courseeditdiag.component';

describe('CourseeditdiagComponent', () => {
  let component: CourseeditdiagComponent;
  let fixture: ComponentFixture<CourseeditdiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseeditdiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseeditdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
