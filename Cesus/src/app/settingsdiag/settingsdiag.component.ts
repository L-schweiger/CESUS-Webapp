import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';

@Component({
  selector: 'app-settingsdiag',
  templateUrl: './settingsdiag.component.html',
  styleUrls: ['./settingsdiag.component.css']
})
export class SettingsdiagComponent implements OnInit {

  constructor(public router: Router, private passdataservice: PassdataService) { }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
