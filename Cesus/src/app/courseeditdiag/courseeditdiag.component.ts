import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CourseEdit, CourseEditMessage, Empty, Role, StringMessage} from '../../grpc/Communication_pb';
import {CourseServiceClient, GroupServiceClient, UserServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Router} from '@angular/router';
import {PassdataService} from '../passdata.service';
declare var $: any;


@Component({
  selector: 'app-courseeditdiag',
  templateUrl: './courseeditdiag.component.html',
  styleUrls: ['./courseeditdiag.component.css']
})
export class CourseeditdiagComponent implements OnInit {
  selectedTab: number;

  currentuserlistincourse = [];
  currentcoursehash: string;

  alluserslist = [];
  allgroupslist = [];

  addcourseCoursename: string;
  addcourseDescription: string;
  addcourseUseraddlist = [];
  addcourseGroupaddlist = [];

  editcourseCoursename: string;
  editcourseDescription: string;
  editcourseUseraddlist = [];
  editcourseUserremovelist = [];
  editcourseGroupaddlist = [];


  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<CourseeditdiagComponent>,
    private passdataservice: PassdataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createCourse() {
    const courseclient = new CourseServiceClient('/api/grpc');
    const req = new CourseEdit();
    req.setName(this.addcourseCoursename);
    req.setDescription(this.addcourseDescription);
    req.addUsersadd(document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, '$1')); // add current user to course

    if (this.addcourseUseraddlist[0] != null) {
      req.setUsersaddList(this.addcourseUseraddlist);
    }

    if (this.addcourseGroupaddlist[0] != null) {
      req.setGroupsaddList(this.addcourseGroupaddlist);
    }

    if (this.addcourseCoursename == null && this.addcourseCoursename === '') {
      this.passdataservice.throwError('Der Kurs muss einen Namen haben');
    } else {
      courseclient.createCourse(req, {}, (err, res) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.dialogRef.close();
        });
      });
    }
  }

  editCourse(courseidtoedit: string) {
    const courseclient = new CourseServiceClient('/api/grpc');
    const req = new CourseEdit();
    const editmsg = new CourseEditMessage();
    const stringmsg = new StringMessage();
    stringmsg.setStr(courseidtoedit);

    courseclient.getCourse(stringmsg, {}, (err, res) => {
      if (this.editcourseCoursename != null && this.editcourseCoursename !== '') {
        req.setName(this.editcourseCoursename);
      } else {
        req.setName(res.getName());
        this.passdataservice.throwError('Kursname ist leer und wird nicht geändert');
      }

      if (this.editcourseDescription != null) {
        req.setDescription(this.editcourseDescription);
      } else {
        req.setDescription(res.getDescription());
      }

      editmsg.setEdit(req);
      editmsg.setId(courseidtoedit);
      editmsg.setHash(res.getHash());

      courseclient.editCourse(editmsg, {}, (err2, res2) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.router.navigate(['courseteacheradmin', { navid: courseidtoedit}], {skipLocationChange: true});
          this.dialogRef.close();
        });
      });
    });
  }

  editCourseusers(courseidtoedit: string) {
    const courseclient = new CourseServiceClient('/api/grpc');
    const req = new CourseEdit();
    const editmsg = new CourseEditMessage();
    const stringmsg = new StringMessage();
    stringmsg.setStr(courseidtoedit);

    courseclient.getCourse(stringmsg, {}, (err, res) => {
      req.setName(res.getName());
      req.setDescription(res.getDescription());
      editmsg.setHash(res.getHash());

      if (this.editcourseGroupaddlist[0] != null) {
        req.setGroupsaddList(this.editcourseGroupaddlist);
      }

      if (this.editcourseUseraddlist[0] != null) {
        req.setUsersaddList(this.editcourseUseraddlist);
      }

      if (this.editcourseUserremovelist[0] != null ) {
        req.setUsersremoveList(this.editcourseUserremovelist);
      }

      editmsg.setEdit(req);
      editmsg.setId(courseidtoedit);

      courseclient.editCourse(editmsg, {}, (err2, res2) => {
        this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
          this.router.navigate(['courseteacheradmin', { navid: courseidtoedit}], {skipLocationChange: true});
          this.dialogRef.close();
        });
      });
    });

  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const userclient = new UserServiceClient('/api/grpc');
      const groupclient = new GroupServiceClient('/api/grpc');
      const courseclient = new CourseServiceClient('/api/grpc');
      const emptymsg = new Empty();
      const stringmsg = new StringMessage();

      if (this.data.alltabs) {
        this.selectedTab = 1;

        stringmsg.setStr(this.data.id);
        courseclient.getCourse(stringmsg, {}, (err, res) => {
          this.currentuserlistincourse = res.getUsersList();
          this.editcourseCoursename = res.getName();
          this.editcourseDescription = res.getDescription();
          this.currentcoursehash = res.getHash();
        });
      } else {
        this.selectedTab = 0;
      }

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
        this.allgroupslist = res.getGroupsList();
      });
    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
