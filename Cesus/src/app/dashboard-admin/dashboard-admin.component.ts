import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {CourseServiceClient, GroupServiceClient} from '../../grpc/CommunicationServiceClientPb';
import {Empty, GroupsMessage, StringMessage} from '../../grpc/Communication_pb';
import {GroupeditdiagComponent} from '../groupeditdiag/groupeditdiag.component';
import {UsereditdiagComponent} from '../usereditdiag/usereditdiag.component';
import {CourseeditdiagComponent} from '../courseeditdiag/courseeditdiag.component';
import {PassdataService} from '../passdata.service';
import {ConfirmdiagComponent} from '../confirmdiag/confirmdiag.component';
declare var $: any;

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  iconRemove = faMinusCircle;
  iconAdd = faPlusCircle;
  courselist = [];
  grouplist = [];

  constructor(public dialog: MatDialog, public router: Router, private passdataservice: PassdataService) { }

  openEditCourse(): void {
    const editcourseRef = this.dialog.open(CourseeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {alltabs: false},
      restoreFocus: false
    });

    editcourseRef.afterClosed().subscribe(result => {

    });
  }

  openEditUser(): void {
    const edituserRef = this.dialog.open(UsereditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {name: 'Testname'},
      restoreFocus: false
    });

    edituserRef.afterClosed().subscribe(result => {

    });
  }

  openEditGroup(): void {
    const editgroupRef = this.dialog.open(GroupeditdiagComponent, {
      width: '80%',
      panelClass: 'dialogstyle',
      data: {name: 'Testname'},
      restoreFocus: false
    });

    editgroupRef.afterClosed().subscribe(result => {

    });
  }

  deleteCourse(courseid: string): void {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const courseclient = new CourseServiceClient('/api/grpc');
        const stringmsg = new StringMessage();

        stringmsg.setStr(courseid);
        courseclient.deleteCourse(stringmsg, {}, (err, res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
            this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
          });
        });
      }
    });
  }

  deleteGroup(groupid: string) {
    const dialogRef = this.dialog.open(ConfirmdiagComponent, {
      width: '350px',
      data: ''
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const groupclient = new GroupServiceClient('/api/grpc');
        const stringmsg = new StringMessage();

        stringmsg.setStr(groupid);
        groupclient.deleteGroup(stringmsg, {}, (err, res) => {
          this.router.navigateByUrl('/', { skipLocationChange: true}).then(() => {
            this.router.navigate(['dashboardadmin'], {skipLocationChange: true});
          });
        });
      }
    });
  }

  navigateToCourse(navcourseid: string) {
    this.passdataservice.navFw('dashboardadmin', '');
    this.router.navigate(['courseteacheradmin', { navid: navcourseid}], {skipLocationChange: true});
  }

  ngOnInit() {
    $('.cardcontentscrollable').mCustomScrollbar({theme:'dark', scrollInertia: 0, mouseWheel: {deltaFactor: 6}});

    if (document.cookie.split(';').filter((item) => item.trim().startsWith('auth=')).length) {
      const courseclient = new CourseServiceClient('/api/grpc');
      const groupclient = new GroupServiceClient('/api/grpc');
      const emptyreq = new Empty();

      courseclient.getCoursesForDashboard(emptyreq, {}, (err, res) => {
        this.courselist = res.getCoursesList();
      });

      groupclient.getGroups(emptyreq, {}, (err2, res2: GroupsMessage) => {
        this.grouplist = res2.getGroupsList();
      });

    } else {
      this.router.navigate([''], { skipLocationChange: true});
    }
  }

}
