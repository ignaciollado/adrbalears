import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';

import { MatDialogModule} from '@angular/material/dialog';
import { NewsAgendaListComponent } from './news/news-agenda-list/news-agenda-list.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { NewsAgendaDetailComponent } from './news/news-agenda-detail/news-agenda-detail.component';

import { FilterPipe } from './Pipes/filter.pipe';
import { HighlightSearchTermPipe } from './Pipes/highlight-search-term.pipe';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    CallToActionComponent,
    PopUpDialogComponent,
    NewsAgendaListComponent,
    InternalServerComponent,
    NotFoundComponent,
    NewsAgendaDetailComponent,
    HighlightSearchTermPipe,
    FilterPipe
  ],
  imports: [NgbModule, TooltipModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    AppRoutingModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
