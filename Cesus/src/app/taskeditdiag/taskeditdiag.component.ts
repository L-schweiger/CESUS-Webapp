import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MiscServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {CheckMode, Empty, EvalInfo, SampleSolutionDownloadable, TaskEdit, TaskEditMessage} from '../../grpc/Communication_pb';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';

export interface MySamplesolDownloadable {
  value: SampleSolutionDownloadable;
  showtxt: string;
}

export interface MyRatingshowafterdeadline {
  value: boolean;
  showtxt: string;
}

export interface MyCheckmodes {
  value: CheckMode;
  showtxt: string;
}

export interface MyConsoleCheck {
  value: boolean;
  showtxt: string;
}

@Component({
  selector: 'app-taskeditdiag',
  templateUrl: './taskeditdiag.component.html',
  styleUrls: ['./taskeditdiag.component.css']
})
export class TaskeditdiagComponent implements OnInit {

  iconRemove = faMinusCircle;
  iconAdd = faPlusCircle;

  samplesolDownloadablevalues: MySamplesolDownloadable[] = [
    {value: SampleSolutionDownloadable.YES, showtxt: 'Ja'},
    {value: SampleSolutionDownloadable.NO, showtxt: 'Nein'},
    {value: SampleSolutionDownloadable.AFTERDEADLINE, showtxt: 'Nach Abgabefrist'}
  ];

  ratingShowvalues: MyRatingshowafterdeadline[] = [
    {value: false, showtxt: 'Ja'},
    {value: true, showtxt: 'Nach Abgabefrist'}
  ];

  checkmodevalues: MyCheckmodes[] = [
    {value: undefined, showtxt: 'Keiner'},
    {value: CheckMode.OUTPUT, showtxt: 'Output'},
    {value: CheckMode.SAMPLE_SOLUTION, showtxt: 'Musterlösung'},
    {value: CheckMode.TEST_PROGRAM, showtxt: 'Testprogramm'}
  ];

  checkconsoleoutvalues: MyConsoleCheck[] = [
    {value: true, showtxt: 'Prüfen'},
    {value: false, showtxt: 'Ignorieren'}
  ];

  addtaskName: string; //
  addtaskDescription: string; //
  addtaskCourseid: string; //
  addtaskDeadline: Date; //
  addtaskMaxpoints: number;
  addtaskAttachmentaddlist = []; //
  addtaskAttachmentnameaddlist = [];
  addtaskSamplesolutionfile: string; //
  addtaskStatementfile: string; //
  addtaskShowratingafterdeadline: boolean;
  addtaskSamplesolutiondownloadable: SampleSolutionDownloadable;
  addtaskCheckmode: CheckMode;
  addtaskTestprogram: string;
  addtaskPrograminputs = [];
  addtaskProgramoutputs = [];
  addtaskTempInput: string;
  addtaskTempOutput: string;
  addtaskOutputpathCheckCurr: string;
  addtaskOutputpathCheck = [];
  addtaskConsoleoutputcheck: boolean;
  addtaskProgrammingLang: string;

  edittaskName: string;
  edittaskDescription: string;
  edittaskCourseid: string;
  edittaskDeadline = new Date();
  edittaskMaxpoints: number;
  edittaskAttachmentaddlist = [];
  edittaskAttachmentremovelist = [];
  edittaskSamplesolutionfile: string;
  edittaskStatementfile: string;
  edittaskShowratingafterdeadline: boolean;
  edittaskSamplesolutiondownloadable: SampleSolutionDownloadable;
  edittaskCheckmode: CheckMode;
  edittaskTestprogram: [];
  edittaskPrograminputs = [];
  edittaskProgramoutputs = [];
  edittaskOutputpathCheckCurr: string;
  edittaskOutputpathCheck = [];
  edittaskConsoleoutputcheck: boolean;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<TaskeditdiagComponent>,
    private passdataservice: PassdataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    console.log('inputs:');
    console.log(this.addtaskPrograminputs);
    console.log('outputs:');
    console.log();
  }

  addFileToTaskArray(filelist: string[]) {
    document.getElementById('fileupload').click();
    document.getElementById('fileupload').onchange = async e => {

      const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
      const formData = new FormData();

      formData.append('file', file);
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { Auth: document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      if (filelist === this.addtaskAttachmentaddlist) {
        this.addtaskAttachmentnameaddlist.push(file.name); // filename hinzufügen
      }

      filelist.push(await resFetch.text()); // add file id to the file array passed

    };
  }

  addFileToTaskString(stringtoset: string) {
    document.getElementById('fileupload').click();
    document.getElementById('fileupload').onchange = async e => {

      const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
      const formData = new FormData();

      formData.append('file', file);
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { Auth: document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      if (stringtoset === 'samplesol') {
        this.addtaskSamplesolutionfile = await resFetch.text(); // set file id of samplesolutionfile
      } else if (stringtoset === 'statement') {
        this.addtaskStatementfile = await resFetch.text(); // set file id of statementfile
      } else if (stringtoset === 'testprogram') {
        this.addtaskTestprogram = await resFetch.text();
      }
    };
  }

  addtaskProgramparamSet() {
    if (this.addtaskTempInput === undefined) {
      this.addtaskPrograminputs.push('');
    } else {
      this.addtaskPrograminputs.push(this.addtaskTempInput);
      this.addtaskTempInput = undefined;
    }

    if (this.addtaskTempOutput === undefined) {
      this.addtaskProgramoutputs.push('');
    } else {
      this.addtaskProgramoutputs.push(this.addtaskTempOutput);
      this.addtaskTempOutput = undefined;
    }

  }

  addtaskAddoutputpath() {
    this.addtaskOutputpathCheck.push(this.addtaskOutputpathCheckCurr);
  }

  deleteUploadFromArray(filename: string) {
    const indextodelete = this.addtaskAttachmentnameaddlist.indexOf(filename);
    this.addtaskAttachmentaddlist.splice(indextodelete, 1);
    this.addtaskAttachmentnameaddlist.splice(indextodelete, 1);
  }

  createTask() {
    const taskclient = new TaskServiceClient('/api/grpc');
    const miscclient = new MiscServiceClient('/api/grpc');
    const req = new TaskEdit();

    const Eval = new EvalInfo();

    if (this.addtaskCheckmode !== undefined) { // PROGRAMMING LANGUAGE SETZEN
      //check.setProgramminglanguage(this.addtaskProgrammingLang); // TODO: selecten in der ui
      //check.setProgramminglanguage('C#'); // HARDCODED FÜR TAMPIER!!!!!
    }

    // TODO: hier checker fixen nach neuer doku
    //Eval.setChecker(check);
    switch (this.addtaskCheckmode) {
      case CheckMode.OUTPUT:
        const output = new EvalInfo.Output();
        for (const param of this.addtaskPrograminputs) {
          output.addInputs(param);
        }
        for (const param of this.addtaskProgramoutputs) {
          output.addOutputs(param);
        }
        Eval.setOutput(output);
        break;
      case CheckMode.SAMPLE_SOLUTION:
        const samplesol = new EvalInfo.SampleSolution();
        for (const param of this.addtaskPrograminputs) {
          samplesol.addInputs(param);
        }
        for (const file of this.addtaskOutputpathCheck) {
          samplesol.addOutputfilestocheck(file);
        }
        samplesol.setCheckconsoleoutput(this.addtaskConsoleoutputcheck);

        Eval.setSamplesolution(samplesol);
        break;
      case CheckMode.TEST_PROGRAM:
        Eval.setTestprogramfile(this.addtaskTestprogram);
        break;
        default:
          break;
    }

    req.setName(this.addtaskName);
    req.setDescription(this.addtaskDescription);
    req.setStatementfile(this.addtaskStatementfile);
    req.setSamplesolutionfile(this.addtaskSamplesolutionfile);
    req.setSamplesolutiondownloadable(this.addtaskSamplesolutiondownloadable);
    if (this.addtaskDeadline !== undefined) {
      req.setDeadline(new Date(this.addtaskDeadline).getTime() / 1000);
    } else {
      req.setDeadline(-1);
    }
    req.setShowratingafterdeadline(this.addtaskShowratingafterdeadline);
    req.setMaxpoints(this.addtaskMaxpoints);
    req.setEvalinfo(Eval);
    req.setCourseid(this.addtaskCourseid);
    req.setAttachmentsaddList(this.addtaskAttachmentaddlist);

    taskclient.createTask(req, {}, (err, res) => {
      console.log('error:');
      console.log(err);
      /*this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['courseteacheradmin', { navid: this.addtaskCourseid}], {skipLocationChange: true});
        this.dialogRef.close();
        });*/
    });
  }

  editTask(taskidtoedit: string) {
    const taskclient = new TaskServiceClient('/api/grpc');
    const req = new TaskEdit();
    const edit = new TaskEditMessage();
    req.setName(this.edittaskName);
    req.setDescription(this.edittaskDescription);
    req.setCourseid(this.edittaskCourseid);
    //req.setDeadline(this.edittaskDeadline / 1000);
    req.setMaxpoints(this.edittaskMaxpoints);
    req.setAttachmentsaddList(this.edittaskAttachmentaddlist);
    req.setAttachmentsremoveList(this.edittaskAttachmentremovelist);
    req.setSamplesolutiondownloadable(this.edittaskSamplesolutiondownloadable);
    req.setSamplesolutionfile(this.edittaskSamplesolutionfile);
    req.setStatementfile(this.edittaskStatementfile);
    req.setShowratingafterdeadline(this.edittaskShowratingafterdeadline);
    req.setEvalinfo();

    edit.setEdit(req);
    edit.setId(taskidtoedit);
    taskclient.editTask(edit, {}, (err, res) => {

    });
  }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const miscclient = new MiscServiceClient('/api/grpc');
      this.addtaskCourseid = this.data.id;
      miscclient.getAvailableCheckers(new Empty(), {}, (err, res) => {
        for (const check of res.getCheckersList()) {
          console.log(check.getProgramminglanguage());
          if (check.getSupportedcheckmodesList().includes(CheckMode.OUTPUT)) {

          } else if (check.getSupportedcheckmodesList().includes(CheckMode.SAMPLE_SOLUTION)) {

          } else if (check.getSupportedcheckmodesList().includes(CheckMode.TEST_PROGRAM)) {

          }

        }
      });

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
