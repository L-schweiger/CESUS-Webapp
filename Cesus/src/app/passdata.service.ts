import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Role} from '../grpc/Communication_pb';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ShowErrorComponent} from './show-error/show-error.component';

@Injectable({
  providedIn: 'root'
})
export class PassdataService {

  constructor(private router: Router, private errorWindow: MatSnackBar) { }

  showtoolbar = false;
  fullname = null;
  role: Role = null;
  navigationStackPath = [];
  navigationStackParam = [];

  navFw(path: string, param: string) {
    this.navigationStackPath.push(path);
    this.navigationStackParam.push(param);
  }

  navBw() {
    this.router.navigate([this.navigationStackPath.pop(), { navid: this.navigationStackParam.pop()}], {skipLocationChange: true});
  }

  navRl() {
    this.router.navigate([this.navigationStackPath.pop(), { navid: this.navigationStackParam.pop()}], {skipLocationChange: true});
  }

  navBack(currComponentRoute: string, param: string) {
    currComponentRoute = currComponentRoute.split(';')[0];
    switch (currComponentRoute) {
      case '/coursestudent':
        this.router.navigate(['dashboardstudent'], { skipLocationChange: true});
        break;
      case '/courseteacheradmin':
        if (this.role === Role.ADMIN) {
          this.router.navigate(['dashboardadmin'], { skipLocationChange: true});
        } else {
          this.router.navigate(['dashboardteacher'], { skipLocationChange: true});
        }
        break;
      case '/taskpreviewteacheradmin':
        this.router.navigate(['courseteacheradmin', { courseid: param}], {skipLocationChange: true});
        break;
      case '/taskopenstudent':
        this.router.navigate(['coursestudent', { courseid: param}], {skipLocationChange: true});
        break;
      case '/taskdoneteacheradmin':
        this.router.navigate(['taskpreviewteacheradmin', { taskid: param}], {skipLocationChange: true});
        break;
      case '/taskdonestudent':
        this.router.navigate(['coursestudent', { courseid: param}], {skipLocationChange: true});
        break;
      default:
        console.log('routing error from: ' + currComponentRoute);
        break;
    }
  }

  throwError(errormsg: string) {
    this.errorWindow.openFromComponent(ShowErrorComponent, {
      duration: 3000,
      data: errormsg,
      panelClass: ['errorMessage']
    });
  }

  async downloadFile(id: string) {
    window.open('/api/files/download/' + id);
  }
}
