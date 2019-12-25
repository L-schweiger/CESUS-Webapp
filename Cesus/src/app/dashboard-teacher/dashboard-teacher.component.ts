import { Component, OnInit } from '@angular/core';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {CourseServiceClient, GroupServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {CoursesMessage, Empty, GroupsMessage, StringMessage, TasksMessage} from '../../grpc/Communication_pb';
import {MatDialog} from '@angular/material/dialog';
import {CourseeditdiagComponent} from '../courseeditdiag/courseeditdiag.component';
import {PassdataService} from '../passdata.service';
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
    const courseclient = new CourseServiceClient('/api/grpc');
    const stringmsg = new StringMessage();

    stringmsg.setStr(courseid);
    courseclient.deleteCourse(stringmsg, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboardteacher'], {skipLocationChange: true});
      });
    });
  }

  deleteTask(taskid: string) {
    const taskclient = new TaskServiceClient('/api/grpc');
    const stringmsg = new StringMessage();

    stringmsg.setStr(taskid);
    taskclient.deleteTask(stringmsg, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboardteacher'], {skipLocationChange: true});
      });
    });
  }

  navigateToCourse(navcourseid: string) {
    this.passdataservice.navFw('courseteacheradmin', navcourseid);
    this.router.navigate(['courseteacheradmin', { courseid: navcourseid}], {skipLocationChange: true});
  }

  navigateToTask(navtaskid: string) {
    this.passdataservice.navFw('courseteacheradmin', navtaskid);
    this.router.navigate(['taskpreviewteacheradmin', { taskid: navtaskid}], {skipLocationChange: true});
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

      if (this.passdataservice.navigationStackPath[0] == null) {
        this.passdataservice.navFw('dashboardteacher', '');
      }

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
