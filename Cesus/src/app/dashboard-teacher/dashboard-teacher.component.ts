import { Component, OnInit } from '@angular/core';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {CourseServiceClient, GroupServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {CoursesMessage, Empty, GroupsMessage, StringMessage, TasksMessage} from '../../grpc/Communication_pb';
import {MatDialog} from '@angular/material/dialog';
import {CourseeditdiagComponent} from '../courseeditdiag/courseeditdiag.component';
import {PassdataService} from '../passdata.service';
import {ConfirmdiagComponent} from '../confirmdiag/confirmdiag.component';
declare var $: any;

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {

  iconAdd = faPlusCircle;
  iconRemove = faMinusCircle;
  courselist = [];
  opentasklist = [];

  constructor(public dialog: MatDialog, public router: Router, public passdataservice: PassdataService) { }

  openEditCourse(): void {
    const editcourseRef = this.dialog.open(CourseeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {alltabs: false},
      restoreFocus: false
    });

    editcourseRef.afterClosed().subscribe(result => {
      console.log('diag closed');

    });
  }

  deleteCourse(courseid: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const courseclient = new CourseServiceClient('/api/grpc');
        const stringmsg = new StringMessage();

        stringmsg.setStr(courseid);
        courseclient.deleteCourse(stringmsg, {}, (err, res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
            this.router.navigate(['dashboardteacher'], {skipLocationChange: true});
          });
        });
      }
    });
  }

  deleteTask(taskid: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const taskclient = new TaskServiceClient('/api/grpc');
        const stringmsg = new StringMessage();

        stringmsg.setStr(taskid);
        taskclient.deleteTask(stringmsg, {}, (err, res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
            this.router.navigate(['dashboardteacher'], {skipLocationChange: true});
          });
        });
      }
    });
  }

  navigateToCourse(navcourseid: string) {
    this.passdataservice.navFw('dashboardteacher', '');
    this.router.navigate(['courseteacheradmin', { navid: navcourseid}], {skipLocationChange: true});
  }

  navigateToTask(navtaskid: string) {
    this.passdataservice.navFw('dashboardteacher', '');
    this.router.navigate(['taskpreviewteacheradmin', { navid: navtaskid}], {skipLocationChange: true});
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const courseclient = new CourseServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const emptyreq = new Empty();

      courseclient.getCoursesForDashboard(emptyreq, {}, (err, res) => {
        this.courselist = res.getCoursesList();
      });
      taskclient.getOpenTasksSorted(emptyreq, {}, (errTask, resTask: TasksMessage) => {
        this.opentasklist = resTask.getTasksList();
      });

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
