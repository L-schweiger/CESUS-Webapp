import {Component, OnInit} from '@angular/core';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PassdataService} from '../passdata.service';
import {SetupServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {
  ADImportSettings,
  DatabaseConnectionSettings,
  Empty,
  GeneralSettingsMessage,
  LdapSettings,
  SetupState,
  SslCredentialsMessage,
  StringMessage
} from '../../grpc/Communication_pb';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  iconContinue = faChevronCircleRight;
  setuppw: string;
  currsetupstate: SetupState;
  // DB CONNECTION SETTINGS
  dbAddress: string;
  dbDatabase: string;
  dbUsername: string;
  dbPassword: string;
  // CONFIGURE ADMIN
  adminPassword: string;
  // CONFIGURE SSL
  sslFile: string;
  sslPassword: string;
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

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  constructor(public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  continueSetup(currState: SetupState) {
    const setupclient = new SetupServiceClient('/api/grpc');
    const setuppw = new StringMessage();
    setuppw.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1'));

    switch (currState) {
      case SetupState.UNCONFIGURED:
        document.cookie = 'SetupPW=' + this.setuppw + ';';
        const dbConnectionSettings = new DatabaseConnectionSettings();
        dbConnectionSettings.setAddress(this.dbAddress);
        dbConnectionSettings.setDatabase(this.dbDatabase);
        dbConnectionSettings.setUsername(this.dbUsername);
        dbConnectionSettings.setPassword(this.dbPassword);

        setupclient.configureDatabase(dbConnectionSettings, {}, (err, res) => {
          if (err == null) {
            this.currsetupstate = SetupState.DATABASE_CONFIGURED;
          } else {
            this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
          }
        });
        break;
      case SetupState.DATABASE_CONFIGURED:
        const adminpw = new StringMessage();

        setupclient.checkSetupPW(setuppw, {}, (err, res) => {
          if (res.getBool()) {
            adminpw.setStr(this.adminPassword);
            setupclient.configureAdminAccount(adminpw, {}, (err2, res2) => {
              if (err2 == null) {
                this.currsetupstate = SetupState.ADMIN_CONFIGURED;
              } else {
                this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
              }
            });
          } else {
            this.passdataservice.throwError('Setup-Passwort ist falsch!');
          }
        });
        break;
      case SetupState.ADMIN_CONFIGURED:
        if (this.sslFile != null) {
          this.passdataservice.throwError('Laden Sie eine SSL-Datei hoch!');
        } else {
          const sslCred = new SslCredentialsMessage();

          sslCred.setFile(this.sslFile);
          if (this.sslPassword == null) {
            sslCred.setPassword('');
          } else {
            sslCred.setPassword(this.sslPassword);
          }

          setupclient.checkSetupPW(setuppw, {}, (err, res) => {
            if (res.getBool()) {
              setupclient.setSslCredentials(sslCred, {}, (err2, res2) => {
                if (err2 == null) {
                  this.currsetupstate = SetupState.SSL_CONFIGURED;
                } else {
                  this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
                }
              });
            } else {
              this.passdataservice.throwError('Setup-Passwort ist falsch!');
            }
          });
        }
        break;
      case SetupState.SSL_CONFIGURED:
        const ldapsets = new LdapSettings();
        const adimportsets = new ADImportSettings();

        adimportsets.setAdminsgroup(this.ldapAdminsgroup);
        adimportsets.setGroupprefix(this.ldapGroupprefix);
        adimportsets.setStudentsgroup(this.ldapStudentsgroup);
        adimportsets.setTeachersgroup(this.ldapTeachersgroup);

        ldapsets.setServer(this.ldapServer);
        ldapsets.setUsername(this.ldapUsername);
        ldapsets.setPassword(this.ldapPassword);
        ldapsets.setAdimportsettings(adimportsets);

        setupclient.checkSetupPW(setuppw, {}, (err, res) => {
          if (res.getBool()) {
            setupclient.setLdapSettings(ldapsets, {}, (err2, res2) => {
              if (err2 == null) {
                this.currsetupstate = SetupState.LDAP_CONFIGURED;
              } else {
                this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
              }
            });
          } else {
            this.passdataservice.throwError('Setup-Passwort ist falsch!');
          }
        });
        break;
      case SetupState.LDAP_CONFIGURED:
        const generalsets = new GeneralSettingsMessage();

        generalsets.setConcurrentexecutioncount(this.generalConcurrentexecutioncount);
        generalsets.setExecuteevalasjob(this.generalExecuteevalasjob);
        generalsets.setJobexecutiontime(this.generalJobexecutiontime);
        generalsets.setUsehsts(this.generalUsehsts);

        setupclient.checkSetupPW(setuppw, {}, (err, res) => {
          if (res.getBool()) {
            setupclient.setGeneralSettings(generalsets, {}, (err2, res2) => {
              if (err2 == null) {
                this.currsetupstate = SetupState.GENERAL_CONFIGURED;
                this.continueSetup(this.currsetupstate);
              } else {
                this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
              }
            });
          } else {
            this.passdataservice.throwError('Setup-Passwort ist falsch!');
          }
        });
        break;
      case SetupState.GENERAL_CONFIGURED:
        const empty = new Empty();

        setupclient.checkSetupPW(setuppw, {}, (err, res) => {
          if (res.getBool()) {
            setupclient.completeSetup(empty, {}, (err2, res2) => {
              if (err2 == null) {
                this.currsetupstate = SetupState.COMPLETE;
                this.redirectToLogin();
              } else {
                this.passdataservice.throwError('Ein Fehler ist aufgetreten!');
              }
            });
          } else {
            this.passdataservice.throwError('Setup-Passwort ist falsch!');
          }
        });
        break;
    }
  }

  uploadSslfile() {
    const file = (document.getElementById('fileupload') as HTMLInputElement).files[0];
    const formData = new FormData();

    formData.append('file', file);
    const request = async () => {
      const resFetch = await fetch('/api/files/upload', {method: 'POST', body: formData, headers: { SetupPW: document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1')}});
      const id = await resFetch.text();

      this.sslFile = id;
    };

    request();
  }

  redirectToLogin() {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'SetupPW=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    this.passdataservice.fullname = null;
    this.passdataservice.showtoolbar = false;
    this.router.navigate([''], { skipLocationChange: true});
  }

  ngOnInit() {

    const setupclient = new SetupServiceClient('/api/grpc');
    const empty = new Empty();
    setupclient.getState(empty, {}, (err, res) => {

      if (res.getState() === SetupState.COMPLETE) {
        this.currsetupstate = res.getState();
        this.redirectToLogin();
      } else {
        this.currsetupstate = res.getState();
      }
    });
  }

}
