import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';
import {PasswordChange, Role} from "../../grpc/Communication_pb";
import {SettingsServiceClient, UserServiceClient} from "../../grpc/CommunicationServiceClientPb";

@Component({
  selector: 'app-settingsdiag',
  templateUrl: './settingsdiag.component.html',
  styleUrls: ['./settingsdiag.component.css']
})
export class SettingsdiagComponent implements OnInit {

  myrole: Role;

  oldpw: string;
  newpw1: string;
  newpw2: string;



  constructor(public router: Router, private passdataservice: PassdataService) { }

  changePw() {
    if (this.newpw1 === this.newpw2) {
      const userclient = new UserServiceClient('/api/grpc');
      const pwchange = new PasswordChange();
      pwchange.setPasswordnew(this.newpw1);
      pwchange.setPasswordold(this.oldpw);

      userclient.changePassword(pwchange, {}, (err, res) => {
        if (err == null) {
          this.router.navigate([''], { skipLocationChange: true});
        } else {
          this.passdataservice.throwError('Passwörtänderung fehlgeschlagen!');
        }
      });

    } else {
      this.passdataservice.throwError('Passwörter stimmen nicht überein!');
    }
  }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {

      this.myrole = this.passdataservice.role;

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
