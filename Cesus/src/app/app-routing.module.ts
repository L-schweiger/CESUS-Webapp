import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardStudentComponent} from './dashboard-student/dashboard-student.component';
import {LoginComponent} from './login/login.component';
import {DashboardTeacherComponent} from './dashboard-teacher/dashboard-teacher.component';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';
import {CourseStudentComponent} from './course-student/course-student.component';
import {CourseTeacherAdminComponent} from './course-teacher-admin/course-teacher-admin.component';
import {TaskPreviewTeacherAdminComponent} from './task-preview-teacher-admin/task-preview-teacher-admin.component';
import {TaskOpenStudentComponent} from './task-open-student/task-open-student.component';
import {TaskDoneTeacherAdminComponent} from './task-done-teacher-admin/task-done-teacher-admin.component';
import {TaskDoneStudentComponent} from './task-done-student/task-done-student.component';


const routes: Routes = [
  {path: 'dashboardstudent', component: DashboardStudentComponent},
  {path: 'dashboardteacher', component: DashboardTeacherComponent},
  {path: 'dashboardadmin', component: DashboardAdminComponent},
  {path: 'coursestudent', component: CourseStudentComponent},
  {path: 'courseteacheradmin', component: CourseTeacherAdminComponent},
  {path: 'taskpreviewteacheradmin', component: TaskPreviewTeacherAdminComponent},
  {path: 'taskopenstudent', component: TaskOpenStudentComponent},
  {path: 'taskdoneteacheradmin', component: TaskDoneTeacherAdminComponent},
  {path: '', component: LoginComponent},
  {path: 'taskdonestudent', component: TaskDoneStudentComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  DashboardStudentComponent,
  DashboardTeacherComponent,
  DashboardAdminComponent,
  CourseStudentComponent,
  CourseTeacherAdminComponent,
  TaskPreviewTeacherAdminComponent,
  TaskOpenStudentComponent,
  TaskDoneTeacherAdminComponent,
  TaskDoneStudentComponent
];
