import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { BodyComponent } from './body/body.component';
import { HomeLandingPageComponent } from './landing-pages/home-landing-page/home-landing-page.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { SearchTheWebResultListComponent } from './searchTheWeb/search-the-web-result-list/search-the-web-result-list.component';
import { AboutAdrBalearsComponent } from './about-us/about-adr-balears/about-adr-balears.component';
import { TransparencyListComponent } from './transparency/transparency-list/transparency-list.component';
import { TransparencyDetailComponent } from './transparency-detail/transparency-detail.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { ContainerNewsAgendaComponent } from './container-news-agenda/container-news-agenda.component';
import { CommonContentViewerComponent } from './common-content-viewer/common-content-viewer.component';
import { ContactAdrBalearsComponent } from './contact-adr-balears/contact-adr-balears.component';
import { EmprenderComponent } from './boost-your-project/emprender/emprender.component';
import { ConsolidarComponent } from './boost-your-project/consolidar/consolidar.component';
import { CrecerComponent } from './boost-your-project/crecer/crecer.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { SimpleTextViewerComponent } from './simple-text-viewer/simple-text-viewer.component';
import { GrantsSubsidiesComponent } from './grants-subsidies/grants-subsidies.component';
import { GuidesAndPublicationsComponent } from './guides-and-publications/guides-and-publications.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: 'about-adr-balears', component: AboutAdrBalearsComponent },
  { path: 'news-agenda-list/:newsToDisplay', component: ContainerNewsAgendaComponent },
  { path: 'news-agenda-list-all/:newsToDisplay', component: NewsListComponent },
  { path: 'news-agenda-detail/:alias/:id', component: NewsDetailComponent },
  { path: 'ayudas-y-subvenciones', component: GrantsSubsidiesComponent},
  { path: 'ajuts-i-subvencions', component: GrantsSubsidiesComponent},
  { path: 'guides-and-publications', component: GuidesAndPublicationsComponent},
  { path: 'transparency-list', component: TransparencyListComponent },
  { path: 'transparency-detail/:alias/:id', component: TransparencyDetailComponent },
  { path: 'search-the-web-result-list/:searchTerm', component: SearchTheWebResultListComponent },
  { path: 'landing-page/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },

  { path: 'ibemprenjove', component: LandingPageComponent },
  { path: 'ibemprenjove/es/:projectName', component: LandingPageComponent },

  { path: 'ibempren', component: LandingPageComponent },
  { path: 'ibempren/es/iempren-recursos-para-emprender', component: LandingPageComponent },
  { path: 'ibtalent', component: LandingPageComponent },
  { path: 'ibtalent/es/bienvenidos-a-ibtalent', component: LandingPageComponent },
  { path: 'ibgestio-xecs', component: LandingPageComponent },
  { path: 'ibgestio-xecs/es/bienvenidos-a-ibgestio-xecs', component: LandingPageComponent },
  { path: 'ibdigitalitzacio-xecs', component: LandingPageComponent },
  { path: 'ibdigitalitzacio-xecs/es/bienvenidos-a-ibdigitalitzacio-xecs', component: LandingPageComponent },

  { path: 'emblematicsbalears', component: LandingPageComponent },
  { path: 'emblematicsbalears/es/bienvenidos-a-emblematicsbalears', component: LandingPageComponent },
  { path: 'ibcomerc-a-escola', component: LandingPageComponent },
  { path: 'ibcomerc-a-escola/es/bienvenidos-a-ibcomerc-a-escola', component: LandingPageComponent },
  { path: 'pa-daqui-forn-i-tradicio', component: LandingPageComponent },
  { path: 'pa-daqui-forn-i-tradicio/es/bienvenidos-a-pa-daqui-forn-i-tradicio', component: LandingPageComponent },
  { path: 'industria-local-sostenible', component: LandingPageComponent },
  { path: 'industria-local-sostenible/es/bienvenidos-a-industria-local-sostenible', component: LandingPageComponent },
  { path: 'ibsostenibilitat-xecs', component: LandingPageComponent },
  { path: 'ibsostenibilitat-xecs/es/bienvenidos-a-ibsostenibilitat-xecs', component: LandingPageComponent },   
  { path: 'ibavals-industria', component: LandingPageComponent },
  { path: 'ibavals-industria/es/bienvenidos-a-ibavals-industria', component: LandingPageComponent },  
  { path: 'exposabyidi', component: LandingPageComponent },
  { path: 'exposabyidi/es/bienvenidos-a-exposabyidi', component: LandingPageComponent },  
  { path: 'ibrelleu', component: LandingPageComponent },
  { path: 'ibrelleu/es/bienvenidos-a-ibrelleu', component: LandingPageComponent },  
  { path: 'loopdisseny', component: LandingPageComponent },
  { path: 'loopdisseny/es/bienvenidos-a-loopdisseny', component: LandingPageComponent },  
  
  { path: 'ibexporta-xecs/es/bienvenidos-a-ibexporta-xecs', component: LandingPageComponent },
  { path: 'ibexporta-xecs', component: LandingPageComponent },
  { path: 'ibexporta-orienta/es/bienvenidos-a-ibexporta-orienta', component: LandingPageComponent },
  { path: 'ibexporta-orienta', component: LandingPageComponent }, 
  { path: 'invest-in-balearics/es/bienvenidos-a-invest-in-balearics', component: LandingPageComponent },
  { path: 'invest-in-balearics', component: LandingPageComponent },
  { path: 'palmainternationalboatshow/es/bienvenidos-a-palmainternationalboatshow', component: LandingPageComponent },
  { path: 'palmainternationalboatshow', component: LandingPageComponent },

  { path: 'direct-link/:id/:idMainCat', component: CommonContentViewerComponent},

  { path: 'emprender', component: EmprenderComponent },
  { path: 'consolidar', component: ConsolidarComponent },
  { path: 'crecer', component: CrecerComponent },

  /* { path: 'contact-adr-balears', component: ContactAdrBalearsComponent}, */
  { path: 'contact-adr-balears', component: ContactFormComponent},

  { path: 'accesibilidad/:id', component: SimpleTextViewerComponent },
  { path: 'aviso-legal/:id', component: SimpleTextViewerComponent },
  { path: 'contacta', component: SimpleTextViewerComponent},
  { path: 'politica-de-cookies/:id', component: SimpleTextViewerComponent},
  { path: 'politica-de-privacidad/:id', component: SimpleTextViewerComponent},
  { path: 'feder-detail/:id', component: SimpleTextViewerComponent },

  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '*', component: HomeLandingPageComponent },
  { path: '', component: HomeLandingPageComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
