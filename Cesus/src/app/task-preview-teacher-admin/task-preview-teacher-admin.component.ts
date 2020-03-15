import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {faCheckCircle, faChevronCircleLeft, faClock, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CourseServiceClient, MiscServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Attachment, Course, Role, StringMessage, Task, UserPreview} from '../../grpc/Communication_pb';
import {PassdataService} from '../passdata.service';
import {TaskeditdiagComponent} from '../taskeditdiag/taskeditdiag.component';
declare var $: any;

@Component({
  selector: 'app-task-preview-teacher-admin',
  templateUrl: './task-preview-teacher-admin.component.html',
  styleUrls: ['./task-preview-teacher-admin.component.css']
})
export class TaskPreviewTeacherAdminComponent implements OnInit {

  iconBack = faChevronCircleLeft;
  iconCheck = faCheckCircle;
  iconWait = faClock;
  taskid: string;
  taskname: string;
  taskdescription: string;
  courseidoftask: string;
  deadline: Date = null;
  taskusers = []; // users with submissions
  taskusersNotsubmitted: UserPreview[] = []; // users without submissions
  taskusersSubmitted: UserPreview[] = []; // temp
  attachmentids: Attachment[] = [];
  attachments = [];
  samplesolutionfile = [];
  statementfile = [];

  constructor(public dialog: MatDialog, public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  openEditTask(): void {
    const edittaskRef = this.dialog.open(TaskeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {alltabs: true, id: this.courseidoftask},
      restoreFocus: false
    });

    edittaskRef.afterClosed().subscribe(result => {
      console.log('diag closed');

    });
  }

  navigateToSubmission(navsubmissionid: string) {
    this.passdataservice.navFw('taskpreviewteacheradmin', this.taskid);
    this.router.navigate(['taskdoneteacheradmin', { navid: navsubmissionid}], {skipLocationChange: true});
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my taskid
        this.taskid = params.get('navid');
      });

      const taskclient = new TaskServiceClient('/api/grpc');
      const courseclient = new CourseServiceClient('api/grpc');
      const miscclient = new MiscServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      stringmsg.setStr(this.taskid);
      taskclient.getTask(stringmsg, {}, (err, res: Task) => {
        this.taskname = res.getName();
        this.taskdescription = res.getDescription();
        this.courseidoftask = res.getCourse().getId();
        if (res.getDeadline() !== -1) { // falls deadline vorhanden
          this.deadline = new Date(res.getDeadline() * 1000);
        }
        this.taskusers = res.getSubmissionsList();
        for (const u of res.getSubmissionsList()) {
          this.taskusersSubmitted.push(u.getUser());
        }
        this.attachmentids = res.getAttatchmentsList();
        this.samplesolutionfile[0] = res.getSamplesolutionfile();
        this.statementfile[0] = res.getStatementfile();

        if (this.statementfile[0] !== null && this.statementfile[0] !== '') {
          stringmsg.setStr(this.statementfile[0]);
          miscclient.getFilename(stringmsg, {}, (errMisc2, resMisc2: StringMessage) => {
            this.statementfile[1] = resMisc2.getStr();
          });
        }

        stringmsg.setStr(this.samplesolutionfile[0]);
        miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
          this.samplesolutionfile[1] = resMisc.getStr();
        });

        for (const id of this.attachmentids) {
          stringmsg.setStr(id.getFile());
          miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
            this.attachments.push({
              attachmentid: id,
              attachmentname: resMisc.getStr()
            });
          });
        }

        stringmsg.setStr(this.courseidoftask);
        courseclient.getCourse(stringmsg, {}, (err2, res2: Course) => {
          this.taskusersNotsubmitted = res2.getUsersList();

          for (const u of this.taskusersSubmitted) {
            const index = this.taskusersNotsubmitted.map(x => x.getId()).indexOf(u.getId());
            this.taskusersNotsubmitted.splice(index, 1);
          }

          for (const u of this.taskusersNotsubmitted) {
            if (u.getRole() === Role.TEACHER || u.getRole() === Role.ADMIN) {
              const index = this.taskusersNotsubmitted.indexOf(u);
              this.taskusersNotsubmitted.splice(index, 1);
            }
          }
          console.log(this.taskusers[0]);
        });
      });
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
