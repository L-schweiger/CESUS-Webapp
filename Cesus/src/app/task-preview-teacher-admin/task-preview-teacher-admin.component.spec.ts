import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPreviewTeacherAdminComponent } from './task-preview-teacher-admin.component';

describe('TaskPreviewTeacherAdminComponent', () => {
  let component: TaskPreviewTeacherAdminComponent;
  let fixture: ComponentFixture<TaskPreviewTeacherAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPreviewTeacherAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPreviewTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
