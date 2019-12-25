import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTeacherAdminComponent } from './course-teacher-admin.component';

describe('CourseTeacherAdminComponent', () => {
  let component: CourseTeacherAdminComponent;
  let fixture: ComponentFixture<CourseTeacherAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTeacherAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTeacherAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
