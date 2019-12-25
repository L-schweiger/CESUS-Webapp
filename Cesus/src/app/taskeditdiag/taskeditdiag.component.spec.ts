import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskeditdiagComponent } from './taskeditdiag.component';

describe('TaskeditdiagComponent', () => {
  let component: TaskeditdiagComponent;
  let fixture: ComponentFixture<TaskeditdiagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskeditdiagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskeditdiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
