import {Component, HostListener, OnInit, Output} from '@angular/core';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import {AuthRequest, Empty, Role, SetupState, StringMessage} from '../../grpc/Communication_pb';
import {AuthServiceClient, SetupServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {PassdataService} from '../passdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  iconLogin = faChevronCircleRight;
  username: string;
  password: string;
  rememberme = true;


  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);

  login() {
    let auth;
    let authexpirationdate;
    const authclient = new AuthServiceClient('/api/grpc');
    const authreq = new AuthRequest();

    authreq.setUsername(this.username);
    authreq.setPassword(this.password);
    authreq.setExtendedtime(this.rememberme);

    authclient.auth(authreq, {}, (err, res) => {

      if (res !== null) {
        auth = res.getToken();
        authexpirationdate = new Date(res.getExpirationdate() * 1000).toUTCString();
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'SetupPW=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        if (this.rememberme) { // cookie normal set
          document.cookie = 'auth=' + auth + ';expires=' + authexpirationdate;
          document.cookie = 'userid=' + res.getUserid() + ';expires=' + authexpirationdate;
        } else { // cookie deleted when browser closed
          document.cookie = 'auth=' + auth + ';';
          document.cookie = 'userid=' + res.getUserid() + ';';
        }

        const userclient = new UserServiceClient('/api/grpc');
        const stringmsg = new StringMessage();
        stringmsg.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
        userclient.getUser(stringmsg, {}, (err2, res2) => {
          this.passdataservice.fullname = res2.getFirstname() + ' ' + res2.getLastname();
          this.passdataservice.showtoolbar = true;
          this.passdataservice.role = res2.getRole();

          switch (res2.getRole()) {
            case Role.ADMIN:
              this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
              break;
            case Role.STUDENT:
              this.router.navigate(['dashboardstudent'], { skipLocationChange: true});
              break;
            case Role.TEACHER:
              this.router.navigate(['dashboardteacher'], { skipLocationChange: true});
              break;
          }

        });
      } else {
        switch (err.code) {
          case 7:
            this.passdataservice.throwError('Benutzername oder Passwort sind falsch!');
            break;
          default:
            this.passdataservice.throwError('Login nicht erfolgreich');
            break;
        }
      }
    });
  }

  constructor(private router: Router, private passdataservice: PassdataService) { }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) { // logged in
      const userclient = new UserServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      stringmsg.setStr(document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, '$1'));
      userclient.getUser(stringmsg, {}, (err2, res2) => {
        this.passdataservice.fullname = res2.getFirstname() + ' ' + res2.getLastname();
        this.passdataservice.showtoolbar = true;
        this.passdataservice.role = res2.getRole();

        switch (res2.getRole()) {
          case Role.ADMIN:
            this.router.navigate(['dashboardadmin'], { skipLocationChange: true});
            break;
          case Role.STUDENT:
            this.router.navigate(['dashboardstudent'], { skipLocationChange: true});
            break;
          case Role.TEACHER:
            this.router.navigate(['dashboardteacher'], { skipLocationChange: true});
            break;
        }

      });
    } else { // not logged in
      const setupclient = new SetupServiceClient('/api/grpc');
      const empty = new Empty();
      setupclient.getState(empty, {}, (err, res) => {
        if (res.getState() !== SetupState.COMPLETE) {
          this.router.navigate(['setup'], { skipLocationChange: true});
        }
      });
    }
  }

}
