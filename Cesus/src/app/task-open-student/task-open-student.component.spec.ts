import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOpenStudentComponent } from './task-open-student.component';

describe('TaskOpenStudentComponent', () => {
  let component: TaskOpenStudentComponent;
  let fixture: ComponentFixture<TaskOpenStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskOpenStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOpenStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
