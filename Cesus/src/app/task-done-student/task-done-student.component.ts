import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MiscServiceClient, SubmissionServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {
  Empty,
  SampleSolutionDownloadable,
  StringMessage,
  Submission,
  SubmissionEdit,
  SubmissionEditMessage,
  Task
} from '../../grpc/Communication_pb';
import {PassdataService} from '../passdata.service';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';

declare var $: any;

declare var google: any;

@Component({
  selector: 'app-task-done-student',
  templateUrl: './task-done-student.component.html',
  styleUrls: ['./task-done-student.component.css']
})
export class TaskDoneStudentComponent implements OnInit {

  iconBack = faChevronCircleLeft;
  submissionid: string;
  taskname: string;
  description: string;
  submissionfile = [];
  samplesolutionfile = [];
  statementfile = [];
  points: number;
  maxpoints: number;
  percent: number;
  grade: number;
  comment: string;
  samplesolutiondownloadable: boolean;
  courseidoftask: string;
  deadline: Date = null;
  currDate: Date = new Date();
  deadlinePassed: boolean;
  bonuspercent = 0;

  @ViewChild('pieChart', {static: false}) pieChart: ElementRef

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ['status', 'points'],
      ['left', 100 - this.percent],
      ['achieved', this.percent]
    ]);

    const databonus = google.visualization.arrayToDataTable([
      ['status', 'points'],
      ['left', this.bonuspercent],
      ['achieved', 100 - this.bonuspercent]
    ]);

    const options = {
      pieStartAngle: 0,
      slices: {
        0: { color: '#ff5959'},
        1: { color: '#67de61'}
      },
      pieSliceText: 'none',
      legend: 'none',
      tooltip: { trigger: 'none' }
    };

    const optionsbonus = {
      pieStartAngle: 0,
      slices: {
        0: { color: '#dec63b'},
        1: { color: '#67de61'}
      },
      pieSliceText: 'none',
      legend: 'none',
      tooltip: { trigger: 'none' }
    };

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    if (this.bonuspercent === 0) {
      chart.draw(data, options);
    } else {
      chart.draw(databonus, optionsbonus);
    }

  }

  submit() {
    const miscclient = new MiscServiceClient('/api/grpc');
    const submissionclient = new SubmissionServiceClient('/api/grpc');
    const taskclient = new TaskServiceClient('/api/grpc');
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

            const stringmsg = new StringMessage();
            stringmsg.setStr(this.submissionid);
            submissionclient.getSubmission(stringmsg, {}, (errOldSub, resOldSub) => {
              const editmsg = new SubmissionEditMessage();
              const req = new SubmissionEdit();
              req.setFile(id);
              req.setTaskid(resOldSub.getTask().getId());
              req.setComment(resOldSub.getComment());
              editmsg.setEdit(req);
              editmsg.setHash(resOldSub.getHash());
              editmsg.setId(resOldSub.getId());
              submissionclient.editSubmission(editmsg, {}, (errSubmission, resSubmission: Submission) => {
                this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
                  this.router.navigate(['coursestudent', { navid: this.courseidoftask}], {skipLocationChange: true});
                });
              });
            });
          };

          request();

      } else {
        this.passdataservice.throwError('Die Deadline wurde überschritten');
      }
    });


  }

  constructor(public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my submissionid
        this.submissionid = params.get('navid');
      });

      const submissionclient = new SubmissionServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const miscclient = new MiscServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      const emptyreq = new Empty();

      miscclient.getServerTime(emptyreq, {}, (errTime, resTime) => {
        this.currDate = new Date(resTime.getInt() * 1000);

        submissionclient.getSubmission(stringmsg, {}, (err, res: Submission) => {
          this.taskname = res.getTask().getName();
          this.points = res.getRating().getPoints();
          this.grade = res.getRating().getGrade();
          if (res.getRating().getComment() === 'Error during Compilation or Execution') {
            this.comment = 'Fehler beim Kompilieren oder Ausführen des Programms';
          } else {
            this.comment = res.getRating().getComment();
          }

          this.submissionfile[0] = res.getFile();

          stringmsg.setStr(this.submissionfile[0]);
          miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
            this.submissionfile[1] = resMisc.getStr();
          });

          stringmsg.setStr(res.getTask().getId());
          taskclient.getTask(stringmsg, {}, (err2, res2: Task) => {
            if (res2.getDeadline() !== -1) { // falls deadline vorhanden
              this.deadline = new Date(res2.getDeadline() * 1000);
              if (this.deadline >= this.currDate) { // if deadline is in future or now
                this.deadlinePassed = false;
              } else {
                this.deadlinePassed = true;
              }
            } else {
              this.deadlinePassed = false;
            }
            if (res2.getSamplesolutiondownloadable() === SampleSolutionDownloadable.NO) {
              this.samplesolutiondownloadable = false;
            } else {
              this.samplesolutiondownloadable = true;
            }
            this.statementfile[0] = res2.getStatementfile();
            this.description = res2.getDescription();
            this.maxpoints = res2.getMaxpoints();
            this.percent = (this.points / this.maxpoints) * 100;

            if (this.points > this.maxpoints) {
              this.bonuspercent = this.percent - 100;
            }

            this.courseidoftask = res2.getCourse().getId();
            if (this.samplesolutiondownloadable) {
              this.samplesolutionfile[0] = res2.getSamplesolutionfile();
              stringmsg.setStr(this.samplesolutionfile[0]);
              miscclient.getFilename(stringmsg, {}, (errMisc2, resMisc2: StringMessage) => {
                this.samplesolutionfile[1] = resMisc2.getStr();
              });
            }

            if (this.statementfile[0] !== null && this.statementfile[0] !== '') {
              stringmsg.setStr(this.statementfile[0]);
              miscclient.getFilename(stringmsg, {}, (errMisc2, resMisc2: StringMessage) => {
                this.statementfile[1] = resMisc2.getStr();
              });
            }

            this.drawChart();
          });
        });
      });
      stringmsg.setStr(this.submissionid);

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

  }

}
