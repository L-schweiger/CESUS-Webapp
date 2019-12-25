import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MiscServiceClient, SubmissionServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {SampleSolutionDownloadable, StringMessage, Submission, Task} from '../../grpc/Communication_pb';
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

  @ViewChild('pieChart', {static: false}) pieChart: ElementRef

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

  constructor(public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      this.route.paramMap.subscribe((params: ParamMap) => { // get my submissionid
        this.submissionid = params.get('submissionid');
      });

      const submissionclient = new SubmissionServiceClient('/api/grpc');
      const taskclient = new TaskServiceClient('/api/grpc');
      const miscclient = new MiscServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      stringmsg.setStr(this.submissionid);
      submissionclient.getSubmission(stringmsg, {}, (err, res: Submission) => {
        this.taskname = res.getTask().getName();
        this.points = res.getRating().getPoints();
        this.grade = res.getRating().getGrade();
        this.comment = res.getRating().getComment();
        this.submissionfile[0] = res.getFile();

        stringmsg.setStr(this.submissionfile[0]);
        miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
          this.submissionfile[1] = resMisc.getStr();
          console.log('submission: ' + this.submissionfile[1]);
        });

        stringmsg.setStr(res.getTask().getId());
        taskclient.getTask(stringmsg, {}, (err2, res2: Task) => {
          if (res2.getSamplesolutiondownloadable() === SampleSolutionDownloadable.NO) {
            this.samplesolutiondownloadable = false;
          } else {
            this.samplesolutiondownloadable = true;
          }
          this.statementfile[0] = res2.getStatementfile();
          this.description = res2.getDescription();
          this.maxpoints = res2.getMaxpoints();
          this.percent = (this.points / this.maxpoints) * 100;
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

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);

  }

}
