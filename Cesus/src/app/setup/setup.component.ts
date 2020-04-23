import { Component, OnInit } from '@angular/core';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PassdataService} from '../passdata.service';
import {SetupServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {
  DatabaseConnectionSettings,
  Empty,
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

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  constructor(public router: Router, public route: ActivatedRoute, public passdataservice: PassdataService) { }

  continueSetup(currState: SetupState) {
    const setupclient = new SetupServiceClient('/api/grpc');

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
        const stringmsg = new StringMessage();
        stringmsg.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1'));

        setupclient.checkSetupPW(stringmsg, {}, (err, res) => {
          if (res.getBool()) {
            stringmsg.setStr(this.adminPassword);
            setupclient.configureAdminAccount(stringmsg, {}, (err2, res2) => {
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
        const stringmsg2 = new StringMessage();
        const sslCred = new SslCredentialsMessage();
        sslCred.setFile(this.sslFile); // TODO: HIER WEITERMACHEN!!!!!!!!!!!! DATEIUPLOAD (nur .pfx)
        if (this.sslPassword == null) {
          sslCred.setPassword('');
        } else {
          sslCred.setPassword(this.sslPassword);
        }

        stringmsg2.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
        setupclient.checkSetupPW(stringmsg2, {}, (err, res) => {
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
        break;
      case SetupState.SSL_CONFIGURED:
        break;
      case SetupState.LDAP_CONFIGURED:
        break;
      case SetupState.GENERAL_CONFIGURED:
        break;
    }
  }

  ngOnInit() {

    const setupclient = new SetupServiceClient('/api/grpc');
    const empty = new Empty();
    setupclient.getState(empty, {}, (err, res) => {

      if (res.getState() === SetupState.COMPLETE) {
          /*document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          document.cookie = 'SetupPW=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          this.passdataservice.fullname = null;
          this.passdataservice.showtoolbar = false;
          this.router.navigate([''], { skipLocationChange: true});*/
          console.log(err);
      } else {

        switch (res.getState()) {
          case SetupState.UNCONFIGURED:
            this.currsetupstate = SetupState.UNCONFIGURED;
            document.cookie = 'SetupPW=' + this.setuppw + ';';
            //console.log(document.cookie.replace(/(?:(?:^|.*;\s*)SetupPW\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
            break;
          case SetupState.DATABASE_CONFIGURED:
            this.currsetupstate = SetupState.DATABASE_CONFIGURED;
            break;
          case SetupState.ADMIN_CONFIGURED:
            this.currsetupstate = SetupState.ADMIN_CONFIGURED;
            break;
          case SetupState.SSL_CONFIGURED:
            this.currsetupstate = SetupState.SSL_CONFIGURED;
            break;
          case SetupState.LDAP_CONFIGURED:
            this.currsetupstate = SetupState.LDAP_CONFIGURED;
            break;
          case SetupState.GENERAL_CONFIGURED:
            this.currsetupstate = SetupState.GENERAL_CONFIGURED;
            break;
        }

      }
    });

  }

}
