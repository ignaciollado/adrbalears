import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-dialog',
  templateUrl: './pop-up-dialog.component.html',
  styleUrl: './pop-up-dialog.component.scss'
})
export class PopUpDialogComponent {
  isPdf1: boolean = false
  isPdf2: boolean = false
  confirmDialog: boolean | undefined = false

  constructor( public dialogRef: MatDialogRef<PopUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {questionText:string, toolTipText: string, doc1: string, doc2: string, confirmDialog?: boolean}
    ) {

      this.confirmDialog = data.confirmDialog

      if (data.doc1) {
        if (data.doc1.split(".")[1]==='pdf') {
          this.isPdf1 = true
        }
      }
      if (data.doc2) {
        if (data.doc2.split(".")[1]==='pdf') {
          this.isPdf2 = true
        }
      }      
     }
    
    onCommand(): void {
      this.dialogRef.close(true);
    }
}
