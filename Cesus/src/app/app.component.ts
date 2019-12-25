import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PassdataService} from './passdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadein', [
      state('void', style({opacity: 0})),
      transition(':enter, :leave',[
        animate(1000)
        ])
    ]),
    trigger('slidein', [
      transition(':enter', [
        style({transform: 'translateX(30%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(30%)'}))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Cesus';
  fullname = '';
  showtoolbar = false;

  constructor(private passdataservice: PassdataService) {}

  updateToolbar() {
    this.fullname = this.passdataservice.fullname;
    this.showtoolbar = this.passdataservice.showtoolbar;
  }
}
