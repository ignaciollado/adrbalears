import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { AgendaDetailComponent } from './agenda/agenda-detail/agenda-detail.component';
import { AgendaListComponent } from './agenda/agenda-list/agenda-list.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';

import { FilterPipe } from './Pipes/filter.pipe';
import { CategoryIdPipe } from './Pipes/category-id.pipe';
import { CategoryTitlePipe } from './Pipes/category-title.pipe';

import { WellFormattedLinkPipe } from './Pipes/well-formatted-link.pipe';
import { GetAliasPipe } from './Pipes/get-alias.pipe';

import { SearchTheWebResultListComponent } from './searchTheWeb/search-the-web-result-list/search-the-web-result-list.component';
import { AboutAdrBalearsComponent } from './about-us/about-adr-balears/about-adr-balears.component';
import { AboutAdrBalearsChildComponent } from './about-us/about-adr-balears-child/about-adr-balears-child.component';
import { TransparencyListComponent } from './transparency/transparency-list/transparency-list.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { SearchTheWebComponent } from './searchTheWeb/search-the-web/search-the-web.component';
import { SliderComponent } from './slider/slider/slider.component';
import { ContainerNewsAgendaComponent } from './container-news-agenda/container-news-agenda.component';
import { CommonContentViewerComponent } from './common-content-viewer/common-content-viewer.component';
import { ContactAdrBalearsComponent } from './contact-adr-balears/contact-adr-balears.component';
import { EmprenderComponent } from './boost-your-project/emprender/emprender.component';
import { ConsolidarComponent } from './boost-your-project/consolidar/consolidar.component';
import { CrecerComponent } from './boost-your-project/crecer/crecer.component';
import { TransparencyDetailComponent } from './transparency-detail/transparency-detail.component';
import { SimpleTextViewerComponent } from './simple-text-viewer/simple-text-viewer.component';
import { GrantsSubsidiesComponent } from './grants-subsidies/grants-subsidies.component';


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
    NewsListComponent,
    NewsDetailComponent,
    AgendaDetailComponent,
    AgendaListComponent,
    InternalServerComponent,
    NotFoundComponent,

    WellFormattedLinkPipe,
    FilterPipe,
    CategoryIdPipe,
    CategoryTitlePipe,
    GetAliasPipe,
    SearchTheWebResultListComponent,
    AboutAdrBalearsComponent,
    AboutAdrBalearsChildComponent,
    TransparencyListComponent,
    LandingPageComponent,
    SearchTheWebComponent,
    SliderComponent,
    ContainerNewsAgendaComponent,
    CommonContentViewerComponent,
    ContactAdrBalearsComponent,
    EmprenderComponent,
    ConsolidarComponent,
    CrecerComponent,
    TransparencyDetailComponent,
    SimpleTextViewerComponent,
    GrantsSubsidiesComponent
  ],
  imports: [NgbModule, TooltipModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
