import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CourseServiceClient, GroupServiceClient, TaskServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Course, CoursesMessage, Empty, GroupsMessage, StringMessage, TasksMessage, User} from '../../grpc/Communication_pb';
import {PassdataService} from '../passdata.service';
declare var $: any;

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {

  courselist = [];
  opentasklist = [];

  constructor(public router: Router, public passdataservice: PassdataService) { }

  navigateToCourse(navcourseid: string) {
    this.passdataservice.navFw('coursestudent', navcourseid);
    this.router.navigate(['coursestudent', { courseid: navcourseid}], {skipLocationChange: true});
  }

  navigateToTask(navtaskid: string) {
    this.passdataservice.navFw('taskopenstudent', navtaskid);
    this.router.navigate(['taskopenstudent', { taskid: navtaskid}], {skipLocationChange: true});
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const userclient = new UserServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const courseclient = new CourseServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      const emptyreq = new Empty();

      stringmsg.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
      userclient.getUser(stringmsg, {}, (errUser, resUser: User) => {
        this.courselist = resUser.getCoursesList();
      });
      taskclient.getOpenTasksSorted(emptyreq, {}, (errTask, resTask: TasksMessage) => {
        this.opentasklist = resTask.getTasksList();
      });

      if (this.passdataservice.navigationStackPath[0] == null) {
        this.passdataservice.navFw('dashboardstudent', '');
      }

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
