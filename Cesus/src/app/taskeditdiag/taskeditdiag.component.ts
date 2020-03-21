import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {MiscServiceClient, TaskServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {
  Attachment,
  CheckMode,
  Empty,
  EvalInfo,
  SampleSolutionDownloadable,
  StringMessage,
  TaskEdit,
  TaskEditMessage
} from '../../grpc/Communication_pb';
import {Router} from '@angular/router';
import {ConfirmdiagComponent} from '../confirmdiag/confirmdiag.component';
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
  addtaskAttachmentaddlistFinal = [];
  addtaskAttachmentnameaddlist = [];
  addtaskSamplesolutionfile: string; //
  addtaskStatementfile: string; //
  addtaskShowratingafterdeadline: boolean;
  addtaskSamplesolutiondownloadable: SampleSolutionDownloadable;
  addtaskProgrammingLang: string;
  addtaskCheckmode: CheckMode;
  addtaskTestprogram: string;
  addtaskPrograminputs = [];
  addtaskProgramoutputs = [];
  addtaskTempInput: string;
  addtaskTempOutput: string;
  addtaskOutputpathCheckCurr: string;
  addtaskOutputpathCheck = [];
  addtaskConsoleoutputcheck: boolean;
  addtaskAvailableProgrammingLang: string[] = [];
  addtaskAvailableCheckmode: CheckMode[][] = [];
  addtaskAvailableCheckmodesForProgl: CheckMode[] = []; // wird beim auswählen dynamisch gesetzt
  addtaskChosenProgLang: string;

  edittaskName: string; //
  edittaskDescription: string; //
  edittaskCourseid: string; //
  edittaskDeadline: Date; //
  edittaskMaxpoints: number;
  edittaskAttachmentaddlist = []; //
  edittaskAttachmentaddlistFinal = [];
  edittaskAttachmentnameaddlist = [];
  edittaskAttachmentremovelist = [];
  edittaskAttachmentremovelistFinal = []; // not used yet
  edittaskSamplesolutionfile: string; //
  edittaskStatementfile: string; //
  edittaskShowratingafterdeadline: boolean;
  edittaskSamplesolutiondownloadable: SampleSolutionDownloadable;
  edittaskProgrammingLang: string;
  edittaskCheckmode: CheckMode;
  edittaskTestprogram: string;
  edittaskPrograminputs = [];
  edittaskProgramoutputs = [];
  edittaskTempInput: string;
  edittaskTempOutput: string;
  edittaskOutputpathCheckCurr: string;
  edittaskOutputpathCheck = [];
  edittaskConsoleoutputcheck: boolean;
  edittaskAvailableProgrammingLang: string[] = [];
  edittaskAvailableCheckmode: CheckMode[][] = [];
  edittaskAvailableCheckmodesForProgl: CheckMode[] = []; // wird beim auswählen dynamisch gesetzt
  edittaskChosenProgLang: string;
  taskid: string;

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public dialogRef: MatDialogRef<TaskeditdiagComponent>,
    private passdataservice: PassdataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  test() {
    console.log(this.edittaskSamplesolutiondownloadable);
  }

  changeProgLang(progl: string) {
    this.addtaskAvailableCheckmodesForProgl = []; // reset

    this.addtaskChosenProgLang = progl;

    const index = this.addtaskAvailableProgrammingLang.indexOf(progl);

    if (this.addtaskAvailableCheckmode[index].includes(CheckMode.OUTPUT)) {
      this.addtaskAvailableCheckmodesForProgl.push(CheckMode.OUTPUT);
    }
    if (this.addtaskAvailableCheckmode[index].includes(CheckMode.SAMPLE_SOLUTION)) {
      this.addtaskAvailableCheckmodesForProgl.push(CheckMode.SAMPLE_SOLUTION);
    }
    if (this.addtaskAvailableCheckmode[index].includes(CheckMode.TEST_PROGRAM)) {
      this.addtaskAvailableCheckmodesForProgl.push(CheckMode.TEST_PROGRAM);
    }

  }

  changeProgLangEdit(progl: string) {
    this.edittaskAvailableCheckmodesForProgl = []; // reset

    this.edittaskChosenProgLang = progl;

    const index = this.edittaskAvailableProgrammingLang.indexOf(progl);

    if (this.edittaskAvailableCheckmode[index].includes(CheckMode.OUTPUT)) {
      this.edittaskAvailableCheckmodesForProgl.push(CheckMode.OUTPUT);
    }
    if (this.edittaskAvailableCheckmode[index].includes(CheckMode.SAMPLE_SOLUTION)) {
      this.edittaskAvailableCheckmodesForProgl.push(CheckMode.SAMPLE_SOLUTION);
    }
    if (this.edittaskAvailableCheckmode[index].includes(CheckMode.TEST_PROGRAM)) {
      this.edittaskAvailableCheckmodesForProgl.push(CheckMode.TEST_PROGRAM);
    }

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

  addFileToTaskArrayEdit(filelist: string[]) {
    document.getElementById('fileupload').click();
    document.getElementById('fileupload').onchange = async e => {

      const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
      const formData = new FormData();

      formData.append('file', file);
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { Auth: document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      if (filelist === this.edittaskAttachmentaddlist) {
        this.edittaskAttachmentnameaddlist.push(file.name); // filename hinzufügen
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
        console.log(this.addtaskStatementfile);
        this.addtaskStatementfile = await resFetch.text(); // set file id of statementfile
        console.log(this.addtaskStatementfile);
      } else if (stringtoset === 'testprogram') {
        this.addtaskTestprogram = await resFetch.text();
      }
    };
  }

  addFileToTaskStringEdit(stringtoset: string) {
    document.getElementById('fileupload').click();
    document.getElementById('fileupload').onchange = async e => {

      const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
      const formData = new FormData();

      formData.append('file', file);
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { Auth: document.cookie.replace(/(?:(?:^|.*;\s*)auth\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      if (stringtoset === 'samplesol') {
        this.edittaskSamplesolutionfile = await resFetch.text(); // set file id of samplesolutionfile
      } else if (stringtoset === 'statement') {
        console.log(this.edittaskStatementfile);
        this.edittaskStatementfile = await resFetch.text(); // set file id of statementfile
        console.log(this.edittaskStatementfile);
      } else if (stringtoset === 'testprogram') {
        this.edittaskTestprogram = await resFetch.text();
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

  addtaskProgramparamSetEdit() {
    if (this.edittaskTempInput === undefined) {
      this.edittaskPrograminputs.push('');
    } else {
      this.edittaskPrograminputs.push(this.addtaskTempInput);
      this.edittaskTempInput = undefined;
    }

    if (this.edittaskTempOutput === undefined) {
      this.edittaskProgramoutputs.push('');
    } else {
      this.edittaskProgramoutputs.push(this.addtaskTempOutput);
      this.edittaskTempOutput = undefined;
    }

  }

  deleteTaskPrograminput(input: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.addtaskPrograminputs.indexOf(input);
        this.addtaskPrograminputs.splice(indextodelete, 1);
        if (this.addtaskProgramoutputs[indextodelete] !== undefined) { // wenn vorhanden, auch programoutput vom pair löschen
          this.addtaskProgramoutputs.splice(indextodelete, 1);
        }
      }
    });

  }

  deleteTaskPrograminputEdit(input: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.edittaskPrograminputs.indexOf(input);
        this.edittaskPrograminputs.splice(indextodelete, 1);
        if (this.edittaskProgramoutputs[indextodelete] !== undefined) { // wenn vorhanden, auch programoutput vom pair löschen
          this.edittaskProgramoutputs.splice(indextodelete, 1);
        }
      }
    });

  }

  addtaskAddoutputpath() {
    this.addtaskOutputpathCheck.push(this.addtaskOutputpathCheckCurr);
    this.addtaskOutputpathCheckCurr = undefined;
  }

  addtaskAddoutputpathEdit() {
    this.edittaskOutputpathCheck.push(this.edittaskOutputpathCheckCurr);
    this.edittaskOutputpathCheckCurr = undefined;
  }

  deleteTaskOutputpath(input: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.addtaskOutputpathCheck.indexOf(input);
        this.addtaskOutputpathCheck.splice(indextodelete, 1);
      }
    });

  }

  deleteTaskOutputpathEdit(input: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.edittaskOutputpathCheck.indexOf(input);
        this.edittaskOutputpathCheck.splice(indextodelete, 1);
      }
    });

  }

  deleteUploadFromArray(filename: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.addtaskAttachmentnameaddlist.indexOf(filename);
        this.addtaskAttachmentaddlist.splice(indextodelete, 1);
        this.addtaskAttachmentnameaddlist.splice(indextodelete, 1);
      }
    });

  }

  deleteUploadFromArrayEdit(filename: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const indextodelete = this.edittaskAttachmentnameaddlist.indexOf(filename);
        this.edittaskAttachmentremovelist = this.edittaskAttachmentaddlist.splice(indextodelete, 1);
        this.edittaskAttachmentnameaddlist.splice(indextodelete, 1);
      }
    });

  }

  deleteUploadFromString(stringtodelete: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (stringtodelete === 'samplesol') {
          this.addtaskSamplesolutionfile = undefined;
        } else if (stringtodelete === 'statement') {
          console.log(this.addtaskStatementfile);
          this.addtaskStatementfile = undefined;
          console.log(this.addtaskStatementfile);
        } else if (stringtodelete === 'testprogram') {
          this.addtaskTestprogram = undefined;
        }
      }
    });

  }

  deleteUploadFromStringEdit(stringtodelete: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (stringtodelete === 'samplesol') {
          this.edittaskSamplesolutionfile = undefined;
        } else if (stringtodelete === 'statement') {
          console.log(this.edittaskStatementfile);
          this.edittaskStatementfile = undefined;
          console.log(this.edittaskStatementfile);
        } else if (stringtodelete === 'testprogram') {
          this.edittaskTestprogram = undefined;
        }
      }
    });

  }

  createTask() {
    const taskclient = new TaskServiceClient('/api/grpc');
    const req = new TaskEdit();

    let Eval = new EvalInfo();

    if (this.addtaskChosenProgLang !== undefined) {
      Eval.setProgramminglanguage(this.addtaskChosenProgLang); // set programming language

      switch (this.addtaskCheckmode) {
        case CheckMode.OUTPUT:
          const output = new EvalInfo.Output();
          output.setInputsList(this.addtaskPrograminputs);
          output.setOutputsList(this.addtaskProgramoutputs);
          /*for (const param of this.addtaskPrograminputs) {
            output.addInputs(param);
          }
          for (const param of this.addtaskProgramoutputs) {
            output.addOutputs(param);
          }*/
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

    } else {
      Eval = null; // auf null gesetzt, da keine automatische prüfung durchgeführt werden soll
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
    for (const att of this.addtaskAttachmentaddlist) { // attachmentlist umwandeln zum senden
      const a = new Attachment();
      a.setFile(att);
      a.setHidden(false);
      this.addtaskAttachmentaddlistFinal.push(a);
    }
    req.setAttachmentsaddList(this.addtaskAttachmentaddlistFinal); // attachmentlist senden

    taskclient.createTask(req, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['courseteacheradmin', { navid: this.addtaskCourseid}], {skipLocationChange: true});
        this.dialogRef.close();
        });
    });
  }

  editTask(taskidtoedit: string) {
    const taskclient = new TaskServiceClient('/api/grpc');
    const req = new TaskEdit();
    const edit = new TaskEditMessage();
    req.setName(this.edittaskName);
    req.setDescription(this.edittaskDescription);
    req.setCourseid(this.edittaskCourseid);
    // req.setDeadline(this.edittaskDeadline / 1000);
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
          this.addtaskAvailableProgrammingLang.push(check.getProgramminglanguage());
          this.addtaskAvailableCheckmode.push(check.getSupportedcheckmodesList());

          this.edittaskAvailableProgrammingLang.push(check.getProgramminglanguage());
          this.edittaskAvailableCheckmode.push(check.getSupportedcheckmodesList());
        }
      });

      if (this.data.alltabs) { // wenn edit gewählt wird
        this.taskid = this.data.id2;
        const taskclient = new TaskServiceClient('/api/grpc');
        const strmsg = new StringMessage();
        strmsg.setStr(this.taskid);
        taskclient.getTask(strmsg,{}, (err, res) => {
          this.edittaskName = res.getName();
          this.edittaskDescription = res.getDescription();
          this.edittaskCourseid = res.getCourse().getId();
          this.edittaskDeadline = new Date(res.getDeadline() * 1000);
          this.edittaskMaxpoints = res.getMaxpoints();
          for (const att of res.getAttatchmentsList()) { // file ids hinzufügen
            this.edittaskAttachmentaddlist.push(att.getFile());
          }
          this.edittaskSamplesolutionfile = res.getSamplesolutionfile();
          this.edittaskStatementfile = res.getStatementfile();
          this.edittaskShowratingafterdeadline = res.getShowratingafterdeadline();
          this.edittaskSamplesolutiondownloadable = res.getSamplesolutiondownloadable();
          if (res.getEvalinfo() == null) {
            this.edittaskProgrammingLang = undefined;
          } else {
            this.edittaskProgrammingLang = res.getEvalinfo().getProgramminglanguage();
            this.changeProgLangEdit(this.edittaskProgrammingLang); // switcht die programmiersprache für auswahl entsprechend verfügbarer checkmodes

            if (res.getEvalinfo().getOutput() !== undefined) {
              this.edittaskCheckmode = CheckMode.OUTPUT;
              this.edittaskPrograminputs = res.getEvalinfo().getOutput().getInputsList();
              this.edittaskProgramoutputs = res.getEvalinfo().getOutput().getOutputsList();
            } else if (res.getEvalinfo().getSamplesolution() !== undefined) {
              this.edittaskCheckmode = CheckMode.SAMPLE_SOLUTION;
              this.edittaskConsoleoutputcheck = res.getEvalinfo().getSamplesolution().getCheckconsoleoutput();
              this.edittaskPrograminputs = res.getEvalinfo().getSamplesolution().getInputsList();
              this.edittaskOutputpathCheck = res.getEvalinfo().getSamplesolution().getOutputfilestocheckList();
            } else if (res.getEvalinfo().getTestprogramfile() !== undefined) {
              this.edittaskCheckmode = CheckMode.TEST_PROGRAM;
              this.edittaskTestprogram = res.getEvalinfo().getTestprogramfile();
            } else {
              console.log('error; you shouldnt get there. please contact nobody because I dont care at all');
            }
          }

          const stringmsg = new StringMessage();
          for (const att of this.edittaskAttachmentaddlist) {
            stringmsg.setStr(att);
            miscclient.getFilename(stringmsg, {}, (errMisc, resMisc: StringMessage) => {
              this.edittaskAttachmentnameaddlist.push(resMisc.getStr());
              console.log(resMisc.getStr());
            });
          }

        });

        // unused:
        // edittaskAttachmentaddlistFinal
      }

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
