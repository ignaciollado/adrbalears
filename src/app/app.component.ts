import { Component, inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title:string = 'ADR alears'
  show:boolean = true
  private modalService = inject(NgbModal)

  @ViewChild('content') infoDialog = {} as TemplateRef<string>;

  constructor( translate: TranslateService, public dialog: MatDialog ){
    translate.addLangs(['cas', 'cat'])
    translate.setDefaultLang('cas')
    translate.use('cas')
    
    /* this.openDialog('3000', '1000', 'Personalice su experiencia', 'texto del tooltip', 'doc1.pdf', 'doc2.pdf') */
  }

  openHomePopUp(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

  close() {
		this.show = false;
		setTimeout(() => (this.show = true), 3000);
	}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, questionText: string, toolTipText: string, doc1: string, doc2: string): void {
    const dialogConfig = new MatDialogConfig();
  
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.panelClass = "dialog-customization"
    dialogConfig.backdropClass = "popupBackdropClass"
 /*    dialogConfig.height = "100%"
    dialogConfig.width = "100%" */
   /*  dialogConfig.position = { 'top': '-50', 'right': '-50' }; */
    
    dialogConfig.data = {
      questionText: questionText, toolTipText: toolTipText, doc1: doc1, doc2: doc2
    };
    this.dialog.open(PopUpDialogComponent, dialogConfig);
  }

}
