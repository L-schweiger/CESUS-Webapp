import {Component, Input, OnInit} from '@angular/core';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import {PassdataService} from '../passdata.service';
import {SettingsdiagComponent} from '../settingsdiag/settingsdiag.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() fullname: string;
  iconLogout = faPowerOff;
  iconSettings = faCogs;

  constructor(public dialog: MatDialog, private router: Router, private passdataservice: PassdataService) { }

  logout() {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'SetupPW=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.passdataservice.fullname = null;
    this.passdataservice.showtoolbar = false;
    this.router.navigate([''], { skipLocationChange: true});
  }

  openSettings(): void {
    const settingsRef = this.dialog.open(SettingsdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {name: 'Testname'}
    });

    settingsRef.afterClosed().subscribe(result => {
      console.log('diag closed');
    });
  }
}
