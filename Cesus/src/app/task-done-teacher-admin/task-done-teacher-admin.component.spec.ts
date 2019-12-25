import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDoneTeacherAdminComponent } from './task-done-teacher-admin.component';

describe('TaskDoneTeacherAdminComponent', () => {
  let component: TaskDoneTeacherAdminComponent;
  let fixture: ComponentFixture<TaskDoneTeacherAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDoneTeacherAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDoneTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
