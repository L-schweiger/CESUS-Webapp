import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CourseServiceClient, MiscServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Course, Empty, Role, StringMessage, Task, TasksMessage} from '../../grpc/Communication_pb';
import {PassdataService} from '../passdata.service';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css']
})
export class CourseStudentComponent implements OnInit {

  iconBack = faChevronCircleLeft;
  courseid: string;
  coursedescription: string;
  coursename: string;
  coursestudents = [];
  courseadmins = [];
  courseteachers = [];
  coursetasks = [];
  opentasklist = []; // ALL open tasks; not only in this course

  constructor(public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  navigateToTask(navtaskid: string) {
    const taskclient = new TaskServiceClient('/api/grpc');
    const stringmsg = new StringMessage();
    stringmsg.setStr(navtaskid);

    taskclient.getTask(stringmsg, {}, (errTask, resTask: Task) => {
      console.log('case 1');
      const allsubmissions = resTask.getSubmissionsList();
      console.log(resTask.getSubmissionsList());
      if (allsubmissions[0] !== null && allsubmissions[0] !== undefined) {
        this.router.navigate(['taskdonestudent', {submissionid: allsubmissions[0].getId()}], {skipLocationChange: true});
      } else {
        this.router.navigate(['taskopenstudent', {taskid: navtaskid}], {skipLocationChange: true});
      }
    });

  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my courseid
        this.courseid = params.get('courseid');
      });

      const courseclient = new CourseServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      const emptyreq = new Empty();
      stringmsg.setStr(this.courseid);
      courseclient.getCourse(stringmsg, {}, (err, res: Course) => {
        this.coursename = res.getName();
        this.coursedescription = res.getDescription();
        this.coursetasks = res.getTasksList();
        for (const u of res.getUsersList()) {
          switch (u.getRole()) {
            case Role.ADMIN:
              this.courseadmins.push(u);
              break;
            case Role.TEACHER:
              this.courseteachers.push(u);
              break;
            case Role.STUDENT:
              this.coursestudents.push(u);
              break;
          }
        }
        this.courseadmins.sort();
        this.courseteachers.sort();
        this.coursestudents.sort();

      });


      taskclient.getOpenTasksSorted(emptyreq, {}, (errTask, resTask: TasksMessage) => {
        this.opentasklist = resTask.getTasksList();
      });
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
