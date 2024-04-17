import { Component, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title:string = 'ADR alears';
  show:boolean = true
  private modalService = inject(NgbModal);

  constructor( translate: TranslateService ){
    translate.addLangs(['cas', 'cat']);
    translate.setDefaultLang('cas');
    translate.use('cas');
  }

  openBackDropCustomClass(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
	}

  close() {
		this.show = false;
		setTimeout(() => (this.show = true), 3000);
	}
}
