import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CourseServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Course, Role, StringMessage} from '../../grpc/Communication_pb';
import {faChevronCircleLeft, faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {PassdataService} from '../passdata.service';
import {CourseeditdiagComponent} from '../courseeditdiag/courseeditdiag.component';
import {TaskeditdiagComponent} from '../taskeditdiag/taskeditdiag.component';
import {ConfirmdiagComponent} from '../confirmdiag/confirmdiag.component';
declare var $: any;

@Component({
  selector: 'app-course-teacher-admin',
  templateUrl: './course-teacher-admin.component.html',
  styleUrls: ['./course-teacher-admin.component.css']
})
export class CourseTeacherAdminComponent implements OnInit {

  iconBack = faChevronCircleLeft;
  iconAdd = faPlusCircle;
  iconRemove = faMinusCircle;
  courseid: string;
  coursedescription: string;
  coursename: string;
  coursestudents = [];
  courseadmins = [];
  courseteachers = [];
  coursetasks = [];

  constructor(public dialog: MatDialog, public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  openCreateTask(): void {
    const createtaskRef = this.dialog.open(TaskeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {alltabs: false, id: this.courseid},
      restoreFocus: false
    });

    createtaskRef.afterClosed().subscribe(result => {

    });
  }

  openEditCourse(): void {
    const editcourseRef = this.dialog.open(CourseeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {alltabs: true, id: this.courseid},
      restoreFocus: false
    });

    editcourseRef.afterClosed().subscribe(result => {

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
            this.router.navigate(['courseteacheradmin', { navid: this.courseid}], {skipLocationChange: true});
          });
        });
      }
    });
  }

  navigateToTask(navtaskid: string) {
    this.passdataservice.navFw('courseteacheradmin', this.courseid);
    this.router.navigate(['taskpreviewteacheradmin', { navid: navtaskid}], {skipLocationChange: true});
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my courseid
        this.courseid = params.get('navid');
      });

      const courseclient = new CourseServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
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
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}

