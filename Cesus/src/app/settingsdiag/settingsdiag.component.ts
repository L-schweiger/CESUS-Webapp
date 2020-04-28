import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';
import {
  ADImportSettings,
  Empty,
  GeneralSettingsMessage,
  LdapSettings,
  PasswordChange,
  Role,
  SslCredentialsMessage
} from '../../grpc/Communication_pb';
import {SettingsServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {MatDialogRef} from '@angular/material/dialog';
declare var $: any;

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

  // DB CONNECTION SETTINGS
  dbAddress: string;
  dbDatabase: string;
  dbUsername: string;
  dbPassword: string;
  // CONFIGURE SSL
  sslFile: string;
  sslPassword: string;
  sslCommonname: string;
  sslThumbprint: string;
  // LDAP Settings
  ldapAdminsgroup: string;
  ldapGroupprefix: string;
  ldapStudentsgroup: string;
  ldapTeachersgroup: string;
  ldapServer: string;
  ldapUsername: string;
  ldapPassword: string;
  // GENERAL SETTINGS
  generalConcurrentexecutioncount: number;
  generalExecuteevalasjob: boolean;
  generalJobexecutiontime: number;
  generalUsehsts: boolean;

  constructor(public router: Router, private passdataservice: PassdataService, public dialogRef: MatDialogRef<SettingsdiagComponent>) { }

  performEdit() {
    const settingsclient = new SettingsServiceClient('/api/grpc');
    const gensetMsg = new GeneralSettingsMessage();
    const ldapSets = new LdapSettings();
    const adimptSets = new ADImportSettings();
    const sslcredMsg = new SslCredentialsMessage();

    gensetMsg.setUsehsts(this.generalUsehsts);
    gensetMsg.setJobexecutiontime(this.generalJobexecutiontime);
    gensetMsg.setExecuteevalasjob(this.generalExecuteevalasjob);
    gensetMsg.setConcurrentexecutioncount(this.generalConcurrentexecutioncount);

    adimptSets.setAdminsgroup(this.ldapAdminsgroup);
    adimptSets.setGroupprefix(this.ldapGroupprefix);
    adimptSets.setTeachersgroup(this.ldapTeachersgroup);
    adimptSets.setStudentsgroup(this.ldapStudentsgroup);
    ldapSets.setAdimportsettings(adimptSets);
    ldapSets.setPassword(this.ldapPassword);
    ldapSets.setUsername(this.ldapUsername);
    ldapSets.setServer(this.ldapServer);

    let sslChange = false;

    if (this.sslFile != null) {
      sslChange = true;
      sslcredMsg.setFile(this.sslFile);
      if (this.sslPassword != null) {
        sslcredMsg.setPassword(this.sslPassword);
      }
    }

    settingsclient.setGeneralSettings(gensetMsg, {}, (err, res) => {
      if (err == null) {
        settingsclient.setLdapSettings(ldapSets, {}, (err2, res2) => {
          if (err2 == null) {
            if  (sslChange) {
              settingsclient.setSslCredentials(sslcredMsg, {}, (err3, res3) => {
                if (err3 == null) {
                  this.router.navigate([''], { skipLocationChange: true});
                  this.dialogRef.close();
                } else {
                  this.passdataservice.throwError('Allgemeine Änderungen fehlgeschlagen!');
                }
              });
            } else {
              this.router.navigate([''], { skipLocationChange: true});
              this.dialogRef.close();
            }

          } else {
            this.passdataservice.throwError('LDAP Änderungen fehlgeschlagen!');
          }
        });
      } else {
        this.passdataservice.throwError('SSL Änderungen fehlgeschlagen!');
      }
    });
  }

  changePw() {
    if (this.newpw1 === this.newpw2) {
      const userclient = new UserServiceClient('/api/grpc');
      const pwchange = new PasswordChange();
      pwchange.setPasswordnew(this.newpw1);
      pwchange.setPasswordold(this.oldpw);

      userclient.changePassword(pwchange, {}, (err, res) => {
        if (err == null) {
          this.router.navigate([''], { skipLocationChange: true});
          this.dialogRef.close();
        } else {
          this.passdataservice.throwError('Passwörtänderung fehlgeschlagen!');
        }
      });

    } else {
      this.passdataservice.throwError('Passwörter stimmen nicht überein!');
    }
  }

  uploadSslfile() {
    const file = (document.getElementById('fileupload1') as HTMLInputElement).files[0];
    const formData = new FormData();

    formData.append('file', file);
    const request = async () => {
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { SetupPW: document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      const id = await resFetch.text();

      this.sslFile = id;
    };

    request();
  }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

      this.myrole = this.passdataservice.role;

      if (this.myrole === Role.ADMIN) {
        const settingsclient = new SettingsServiceClient('/api/grpc');

        settingsclient.getDatabaseConnectionSettings(new Empty(), {}, (err, res) => {
          this.dbAddress = res.getAddress();
          this.dbDatabase = res.getDatabase();
          this.dbPassword = res.getPassword();
          this.dbUsername = res.getUsername();
        });

        settingsclient.getGeneralSettings(new Empty(), {}, (err, res) => {
          this.generalConcurrentexecutioncount = res.getConcurrentexecutioncount();
          this.generalExecuteevalasjob = res.getExecuteevalasjob();
          this.generalJobexecutiontime = res.getConcurrentexecutioncount();
          this.generalUsehsts = res.getUsehsts();
        });

        settingsclient.getLdapSettings(new Empty(), {}, (err, res) => {
          this.ldapAdminsgroup = res.getAdimportsettings().getAdminsgroup();
          this.ldapGroupprefix = res.getAdimportsettings().getGroupprefix();
          this.ldapTeachersgroup = res.getAdimportsettings().getTeachersgroup();
          this.ldapStudentsgroup = res.getAdimportsettings().getStudentsgroup();
          this.ldapUsername = res.getUsername();
          this.ldapPassword = res.getPassword();
          this.ldapServer = res.getServer();
        });

        settingsclient.getSslInfo(new Empty(), {}, (err, res) => {
          this.sslCommonname = res.getCommonname();
          this.sslThumbprint = res.getThumbprint();
        });
      }

    } else {
      this.router.navigate([''], { skipLocationChange: true});
      this.dialogRef.close();
    }
  }

}
