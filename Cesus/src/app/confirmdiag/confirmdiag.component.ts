import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-confirmdiag',
  templateUrl: './confirmdiag.component.html',
  styleUrls: ['./confirmdiag.component.css']
})
export class ConfirmdiagComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmdiagComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
