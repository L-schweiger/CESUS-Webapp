import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule} from '@angular/material';
import { MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardTeacherComponent } from './dashboard-teacher/dashboard-teacher.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CourseStudentComponent } from './course-student/course-student.component';
import { CourseTeacherAdminComponent } from './course-teacher-admin/course-teacher-admin.component';
import {TaskPreviewTeacherAdminComponent} from './task-preview-teacher-admin/task-preview-teacher-admin.component';
import { TaskOpenStudentComponent } from './task-open-student/task-open-student.component';
import { TaskDoneTeacherAdminComponent } from './task-done-teacher-admin/task-done-teacher-admin.component';
import { MatSelectModule } from '@angular/material/select';
import { TaskDoneStudentComponent } from './task-done-student/task-done-student.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { TaskeditdiagComponent } from './taskeditdiag/taskeditdiag.component';
import { CourseeditdiagComponent } from './courseeditdiag/courseeditdiag.component';
import { GroupeditdiagComponent } from './groupeditdiag/groupeditdiag.component';
import { UsereditdiagComponent } from './usereditdiag/usereditdiag.component';
import { SettingsdiagComponent } from './settingsdiag/settingsdiag.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ToolbarComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
    CourseStudentComponent,
    CourseTeacherAdminComponent,
    TaskPreviewTeacherAdminComponent,
    TaskOpenStudentComponent,
    TaskDoneTeacherAdminComponent,
    TaskDoneStudentComponent,
    ShowErrorComponent,
    TaskeditdiagComponent,
    CourseeditdiagComponent,
    GroupeditdiagComponent,
    UsereditdiagComponent,
    SettingsdiagComponent
  ],
  entryComponents: [
    ShowErrorComponent,
    TaskeditdiagComponent,
    CourseeditdiagComponent,
    GroupeditdiagComponent,
    UsereditdiagComponent,
    SettingsdiagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
