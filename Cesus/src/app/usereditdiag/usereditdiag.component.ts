import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Empty, Role, StringMessage, UserEdit, UserEditMessage} from '../../grpc/Communication_pb';
import {faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {MatSelectionList, MatSelectionListChange} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {PassdataService} from '../passdata.service';

export interface MyRole {
  value: Role;
  showtxt: string;
}

@Component({
  selector: 'app-usereditdiag',
  templateUrl: './usereditdiag.component.html',
  styleUrls: ['./usereditdiag.component.css']
})
export class UsereditdiagComponent implements OnInit {

  iconRemove = faMinusCircle;

  roles: MyRole[] = [
    {value: Role.STUDENT, showtxt: 'Schüler'},
    {value: Role.TEACHER, showtxt: 'Lehrer'},
    {value: Role.ADMIN, showtxt: 'Administrator'}
  ];

  alluserslist = [];

  adduserFirstname: string;
  adduserLastname: string;
  adduserPassword: string;
  adduserPasswordConfirmed: string;
  adduserRole: Role;
  adduserUsername: string;

  edituserFirstname: string;
  edituserLastname: string;
  edituserPassword: string;
  edituserPasswordConfirmed: string;
  edituserRole: Role;
  edituserUsername: string;
  idofusertoedit: string;

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<UsereditdiagComponent>,
    private passdataservice: PassdataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeUsr(lst: MatSelectionList, event: MatSelectionListChange) {
    const userclient = new UserServiceClient('/api/grpc');
    const stringmsg = new StringMessage();

    lst.deselectAll();
    event.option.selected = true;

    this.idofusertoedit = event.option.value;

    stringmsg.setStr(event.option.value);
    userclient.getUser(stringmsg, {}, (err, res) => {
      this.edituserFirstname = res.getFirstname();
      this.edituserLastname = res.getLastname();
      this.edituserPassword = null;
      this.edituserUsername = res.getUsername();
      this.edituserRole = res.getRole();
    });
  }

  createUser() {
    const userclient = new UserServiceClient('/api/grpc');
    const req = new UserEdit();
    req.setFirstname(this.adduserFirstname);
    req.setLastname(this.adduserLastname);
    req.setPassword(this.adduserPassword);
    req.setRole(this.adduserRole);
    req.setUsername(this.adduserUsername);
    req.setPasswordset(false);

    if (this.adduserFirstname != null && this.adduserFirstname !== '') {
      req.setFirstname(this.adduserFirstname);
    } else {
      this.passdataservice.throwError('Geben Sie einen Vornamen ein');
    }

    if (this.adduserLastname != null && this.adduserLastname !== '') {
      req.setLastname(this.adduserLastname);
    } else {
      this.passdataservice.throwError('Geben Sie einen Nachnamen ein');
    }

    if (this.adduserPassword != null && this.adduserPassword !== '') {
      if (this.adduserPassword === this.adduserPasswordConfirmed) {
        req.setPassword(this.adduserPassword);
        req.setPasswordset(true);
      } else {
        this.passdataservice.throwError('Die Passwörter stimmen nicht überein!');
      }
    } else {
      this.passdataservice.throwError('Geben Sie ein Passwort ein');
    }

    if (this.adduserRole != null) {
      req.setRole(this.adduserRole);
    } else {
      this.passdataservice.throwError('Wählen Sie die Benutzerrolle');
    }

    if (this.adduserUsername != null && this.adduserUsername !== '') {
      req.setUsername(this.adduserUsername);
    } else {
      this.passdataservice.throwError('Geben Sie einen Benutzernamen ein');
    }

    userclient.createUser(req, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
        this.dialogRef.close();
      });
    });
  }

  deleteUser(useridtodelete: string) {
    const userclient = new UserServiceClient('/api/grpc');
    const stringmsg = new StringMessage();
    stringmsg.setStr(useridtodelete);

    userclient.deleteUser(stringmsg, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
        this.dialogRef.close();
      });
    });
  }

  editUser(useridtoedit: string) {
    const userclient = new UserServiceClient('/api/grpc');
    const req = new UserEdit();
    const edit = new UserEditMessage();
    const stringmsg = new StringMessage();
    stringmsg.setStr(useridtoedit);
    req.setPasswordset(false);

    userclient.getUser(stringmsg, {}, (err, res) => {
      if (this.edituserFirstname != null && this.edituserFirstname !== '') {
        req.setFirstname(this.edituserFirstname);
      } else {
        req.setFirstname(res.getFirstname());
      }

      if (this.edituserLastname != null && this.edituserLastname !== '') {
        req.setLastname(this.edituserLastname);
      } else {
        req.setLastname(res.getLastname());
      }

      if (this.edituserPassword != null && this.edituserPassword !== '') {
        if (this.edituserPassword === this.edituserPasswordConfirmed) {
          req.setPassword(this.edituserPassword);
          req.setPasswordset(true);
        } else {
          this.passdataservice.throwError('Die Passwörter stimmen nicht überein!');
        }
      }

      if (this.edituserRole != null) {
        req.setRole(this.edituserRole);
      } else {
        req.setRole(res.getRole());
      }

      if (this.edituserUsername != null && this.edituserUsername !== '') {
        req.setUsername(this.edituserUsername);
      } else {
        req.setUsername(res.getUsername());
      }

      edit.setId(useridtoedit);
      edit.setEdit(req);
      edit.setHash(res.getHash());
      userclient.editUser(edit, {}, (err2, res2) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
          this.dialogRef.close();
        });
      });
    });
  }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const userclient = new UserServiceClient('/api/grpc');
      const emptymsg = new Empty();

      userclient.getUsers(emptymsg, {}, (err, res) => {
        for (const usr of res.getUsersList()) {
          if (usr.getRole() === Role.ADMIN) {
            this.alluserslist.push(usr);
          }
        }
        for (const usr of res.getUsersList()) {
          if (usr.getRole() === Role.TEACHER) {
            this.alluserslist.push(usr);
          }
        }
        for (const usr of res.getUsersList()) {
          if (usr.getRole() === Role.STUDENT) {
            this.alluserslist.push(usr);
          }
        }
      });
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
