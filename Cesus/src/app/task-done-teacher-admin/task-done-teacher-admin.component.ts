import { Component, OnInit , NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import {MiscServiceClient, RatingServiceClient, SubmissionServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {RatingEdit, RatingEditMessage, StringMessage, Submission, Task} from '../../grpc/Communication_pb';
import {PassdataService} from '../passdata.service';
import {faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
declare var $: any;

declare var google: any;

export interface Grade {
    value: number;
    showtxt: string;
  }

@Component({
  selector: 'app-task-done-teacher-admin',
  templateUrl: './task-done-teacher-admin.component.html',
  styleUrls: ['./task-done-teacher-admin.component.css']
})
export class TaskDoneTeacherAdminComponent implements OnInit {

  constructor(private usengZone: NgZone, public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  grades: Grade[] = [
    {value: 0, showtxt: 'Keine Note'},
    {value: 1, showtxt: '1'},
    {value: 2, showtxt: '2'},
    {value: 3, showtxt: '3'},
    {value: 4, showtxt: '4'},
    {value: 5, showtxt: '5'}
  ];

  iconBack = faChevronCircleLeft;
  submissionid: string;
  userfullname: string;
  taskname: string;
  submissionfile = [];
  samplesolutionfile = [];
  statementfile = [];
  points: number;
  maxpoints: number;
  percent: number;
  grade: number;
  comment: string;
  usercomment: string;
  ratingid: string;
  ratinghash: string;
  editedGrade: number;
  editedPoints: number;
  editedComment: string;
  taskid: string;


  @ViewChild('pieChart', {static: false}) pieChart: ElementRef;

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ['status', 'points'],
      ['left', 100 - this.percent],
      ['achieved', this.percent]
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

    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

    chart.draw(data, options);
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.usengZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  editRating() {
    const ratingclient = new RatingServiceClient('/api/grpc');
    const edit = new RatingEdit();
    edit.setSubmissionid(this.submissionid);
    edit.setGrade(this.editedGrade);
    edit.setComment(this.editedComment);
    if (this.editedPoints > -1 && this.editedPoints <= this.maxpoints) {
      edit.setPoints(this.editedPoints);
    } else {
      edit.setPoints(this.points);
    }

    if (this.ratingid === null || this.ratingid === '') { // falls noch kein rating vorhanden -> create
      ratingclient.createRating(edit, {}, (err, res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.router.navigate(['taskdoneteacheradmin', { navid: this.submissionid}], {skipLocationChange: true});
        });
      });
    } else { // falls rating vorhanden -> edit
      const req = new RatingEditMessage();
      req.setEdit(edit);
      req.setHash(this.ratinghash);
      req.setId(this.ratingid);
      ratingclient.editRating(req, {}, (err, res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.router.navigate(['taskdoneteacheradmin', { navid: this.submissionid}], {skipLocationChange: true});
        });
      });
    }
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});
    $('.description').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my submissionid
        this.submissionid = params.get('navid');
      });

      const submissionclient = new SubmissionServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const miscclient = new MiscServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      stringmsg.setStr(this.submissionid);
      submissionclient.getSubmission(stringmsg, {}, (err, res: Submission) => {
        this.userfullname = res.getUser().getFirstname() + ' ' + res.getUser().getLastname();
        this.taskname = res.getTask().getName();
        this.usercomment = res.getComment();
        this.ratingid = res.getRating().getId();
        this.ratinghash = res.getRating().getHash();
        this.points = res.getRating().getPoints();
        this.grade = res.getRating().getGrade();
        this.comment = res.getRating().getComment();
        this.submissionfile[0] = res.getFile();

        this.editedComment = this.comment;
        this.editedPoints = + this.points;
        this.editedGrade = this.grade;

        stringmsg.setStr(this.submissionfile[0]);
        miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
          this.submissionfile[1] = resMisc.getStr();
          console.log('submission: ' + this.submissionfile[1]);
        });

        stringmsg.setStr(res.getTask().getId());
        taskclient.getTask(stringmsg, {}, (err2, res2: Task) => {
          this.taskid = res2.getId();
          this.maxpoints = res2.getMaxpoints();
          this.percent = (this.points / this.maxpoints) * 100;
          this.samplesolutionfile[0] = res2.getSamplesolutionfile();
          this.statementfile[0] = res2.getStatementfile();

          if (this.statementfile[0] !== null && this.statementfile[0] !== '') {
            stringmsg.setStr(this.statementfile[0]);
            miscclient.getFilename(stringmsg, {}, (errMisc2, resMisc2: StringMessage) => {
              this.statementfile[1] = resMisc2.getStr();
            });
          }

          stringmsg.setStr(this.samplesolutionfile[0]);
          miscclient.getFilename(stringmsg, {}, (errMisc2, resMisc2: StringMessage) => {
            this.samplesolutionfile[1] = resMisc2.getStr();
            console.log('sample: ' + this.samplesolutionfile[1]);
          });

          this.drawChart();
        });
      });

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

}
