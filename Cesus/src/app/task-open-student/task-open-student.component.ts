import {Component, OnInit, NgZone, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MiscServiceClient, SubmissionServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {
  Attachment,
  Empty,
  SampleSolutionDownloadable,
  StringMessage,
  Submission,
  SubmissionEdit,
  Task
} from '../../grpc/Communication_pb';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {PassdataService} from '../passdata.service';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-task-open-student',
  templateUrl: './task-open-student.component.html',
  styleUrls: ['./task-open-student.component.css']
})
export class TaskOpenStudentComponent implements OnInit {

  iconBack = faChevronCircleLeft;
  taskid: string;
  taskname: string;
  taskdescription: string;
  courseidoftask: string;
  attachmentids: Attachment[] = [];
  attachments = [];
  samplesolutionfile = [];
  statementfile = [];
  samplesolutiondownloadable: boolean;
  deadline: Date = null;
  usercomment: string;
  currDate: Date = new Date();
  deadlinePassed: boolean;

  constructor(private usengZone: NgZone, public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.usengZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  submit() {
    const miscclient = new MiscServiceClient('/api/grpc');
    const emptyreq = new Empty();
    miscclient.getServerTime(emptyreq, {}, (err, res) => {
      this.currDate = new Date(res.getInt() * 1000);

      if (this.deadline >= this.currDate || this.deadline === null) { // if deadline is in future or now
        const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
        const formData = new FormData();

        formData.append('file', file);
        const request = async () => {
          const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { Auth: document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
          const id = await resFetch.text();

          const submissionclient = new SubmissionServiceClient('/api/grpc');
          const req = new SubmissionEdit();
          req.setFile(id);
          req.setTaskid(this.taskid);
          req.setComment(this.usercomment);
          submissionclient.createSubmission(req, {}, (errSubmission, resSubmission: Submission) => {
            this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
              this.router.navigate(['coursestudent', { navid: this.courseidoftask}], {skipLocationChange: true});
            });
          });
        };

        request();

      } else {
        this.passdataservice.throwError('Die Deadline wurde überschritten');
      }
    });


  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my taskid
        this.taskid = params.get('navid');
      });

      const taskclient = new TaskServiceClient('/api/grpc');
      const miscclient = new MiscServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      const emptyreq = new Empty();
      miscclient.getServerTime(emptyreq, {}, (err, res) => {
        this.currDate = new Date(res.getInt() * 1000);
      });

      stringmsg.setStr(this.taskid);
      taskclient.getTask(stringmsg, {}, (err, res: Task) => {
        this.taskname = res.getName();
        this.taskdescription = res.getDescription();
        this.courseidoftask = res.getCourse().getId();
        console.log('courseidoftask beim getten ist:' + this.courseidoftask);
        this.attachmentids = res.getAttatchmentsList();
        this.samplesolutionfile[0] = res.getSamplesolutionfile();
        this.statementfile[0] = res.getStatementfile();
        if (res.getSamplesolutiondownloadable() === SampleSolutionDownloadable.NO) {
          this.samplesolutiondownloadable = false;
        } else {
          this.samplesolutiondownloadable = true;
        }

        if (res.getDeadline() !== -1) { // falls deadline vorhanden
          this.deadline = new Date(res.getDeadline() * 1000);
          if (this.deadline >= this.currDate) { // if deadline is in future or now
            this.deadlinePassed = false;
          } else {
            this.deadlinePassed = true;
          }
        } else {
          this.deadlinePassed = false;
        }

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

      });
      console.log('passed deadline:' + this.deadlinePassed);
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
