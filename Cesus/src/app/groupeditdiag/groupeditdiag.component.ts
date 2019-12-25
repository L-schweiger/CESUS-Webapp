import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../course-teacher-admin/course-teacher-admin.component';
import {CourseServiceClient, GroupServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {CourseEdit, CourseEditMessage, Empty, GroupEdit, GroupEditMessage, Role, StringMessage} from '../../grpc/Communication_pb';
import {MatSelectionList, MatSelectionListChange} from '@angular/material';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';

@Component({
  selector: 'app-groupeditdiag',
  templateUrl: './groupeditdiag.component.html',
  styleUrls: ['./groupeditdiag.component.css']
})

export class GroupeditdiagComponent implements OnInit {

  idofgrouptoedit: string;

  alluserslist = [];
  allcourseslist = [];

  currentuserlistingroup = [];

  addgroupGroupname: string;
  addgroupUseraddlist = [];

  editgroupGroupname: string;
  editgroupUseraddlist = [];
  editgroupUserremovelist = [];

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<GroupeditdiagComponent>,
    private passdataservice: PassdataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeGrp(lst: MatSelectionList, event: MatSelectionListChange) {
    const groupclient = new GroupServiceClient('/api/grpc');
    const stringmsg = new StringMessage();

    lst.deselectAll();
    event.option.selected = true;

    this.idofgrouptoedit = event.option.value;

    stringmsg.setStr(event.option.value);
    groupclient.getGroup(stringmsg, {}, (err, res) => {
      this.currentuserlistingroup = res.getUsersList();
      this.editgroupGroupname = res.getName();
    });
  }

  createGroup() {
    const groupclient = new GroupServiceClient('/api/grpc');
    const req = new GroupEdit();
    req.setName(this.addgroupGroupname);

    if (this.addgroupUseraddlist[0] != null) {
      req.setUsersaddList(this.addgroupUseraddlist);
    }

    groupclient.createGroup(req, {}, (err, res) => {
      this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
        this.dialogRef.close();
      });
    });
  }

  editGroup(groupidtoedit: string) {
    if (this.idofgrouptoedit != null) {
      const groupclient = new GroupServiceClient('/api/grpc');
      const stringmsg = new StringMessage();
      stringmsg.setStr(this.idofgrouptoedit);
      groupclient.getGroup(stringmsg, {}, (err, res) => {
        const req = new GroupEdit();
        const editmsg = new GroupEditMessage();

        if (this.editgroupGroupname != null && this.editgroupGroupname !== '') {
          req.setName(this.editgroupGroupname);
        } else {
          req.setName(res.getName());
        }
        if (this.editgroupUseraddlist[0] != null) {
          req.setUsersaddList(this.editgroupUseraddlist);
        }

        if (this.editgroupUserremovelist[0] != null) {
          req.setUsersremoveList(this.editgroupUserremovelist);
        }

        editmsg.setEdit(req);
        editmsg.setId(groupidtoedit);
        editmsg.setHash(res.getHash());

        groupclient.editGroup(editmsg, {}, (err2, res2) => {
          this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
            this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
            this.dialogRef.close();
          });
        });
      });

    } else {
      this.passdataservice.throwError('Gruppe kann nicht bearbeitet werden!');
    }
  }

  ngOnInit() {
    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const userclient = new UserServiceClient('/api/grpc');
      const groupclient = new GroupServiceClient('/api/grpc');
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

      groupclient.getGroups(emptymsg, {}, (err, res) => {
        this.allcourseslist = res.getGroupsList();
      });
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }

  }

}
