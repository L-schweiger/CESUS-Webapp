import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDoneStudentComponent } from './task-done-student.component';

describe('TaskDoneStudentComponent', () => {
  let component: TaskDoneStudentComponent;
  let fixture: ComponentFixture<TaskDoneStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDoneStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoneStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
