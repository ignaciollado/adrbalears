import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ADR alears';

  constructor( translate: TranslateService ){
    translate.addLangs(['cas', 'cat']);
    translate.setDefaultLang('cas');
    translate.use('cas');
  }
}
