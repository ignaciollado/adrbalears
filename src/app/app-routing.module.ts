import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { BodyComponent } from './body/body.component';
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

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'about-adr-balears', component: AboutAdrBalearsComponent },
  { path: 'news-agenda-list/:newsToDisplay', component: ContainerNewsAgendaComponent },
  { path: 'news-agenda-list-all/:newsToDisplay', component: NewsListComponent },
  { path: 'news-agenda-detail/:alias/:id', component: NewsDetailComponent },
  { path: 'transparency-list', component: TransparencyListComponent },
  { path: 'transparency-detail/:alias/:id', component: TransparencyDetailComponent },
  { path: 'search-the-web-result-list/:searchTerm', component: SearchTheWebResultListComponent },
  { path: 'landing-page/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },

  { path: 'ibemprenjove/ca/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibemprenjove/es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibempren/ca/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibempren/es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibtalent/ca/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibtalent/es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibgestio-xecs/ca/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibgestio-xecs/es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibdigitalitzacio-xecs/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibdigitalitzacio-xecs-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },

  { path: 'emblematics-balears/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'emblematics-balears-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibcomerc-a-escola/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibcomerc-a-escola-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'pa-daqui-forn-i-pastisseria/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'pa-daqui-forn-i-pastisseria-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'industria-local-sostenible/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'industria-local-sostenible-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibsostenibilitat-xecs/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibsostenibilitat-xecs-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibavals-industria/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibavals-industria-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'exposabyidi/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'exposabyidi-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibrelleu/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibrelleu-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'loop-disseny-i-circularitat/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'loop-disseny-i-circularitat-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  
  { path: 'ibexporta-xecs/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'ibexporta-xecs-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'invest-in-balearics/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'invest-in-balearics-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'pibs/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },
  { path: 'pibs-es/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },

  { path: 'direct-link/:id/:idMainCat', component: CommonContentViewerComponent},

  { path: 'emprender', component: EmprenderComponent },
  { path: 'consolidar', component: ConsolidarComponent },
  { path: 'crecer', component: CrecerComponent },

  { path: 'contact-adr-balears', component: ContactAdrBalearsComponent},

  { path: 'accesibilidad/:id', component: CommonContentViewerComponent },
  { path: 'aviso-legal/:id', component: CommonContentViewerComponent },
  { path: 'contacta', component: CommonContentViewerComponent},
  { path: 'politica-de-cookies/:id', component: CommonContentViewerComponent},
  { path: 'politica-de-privacidad/:id', component: CommonContentViewerComponent},

  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '*', component: BodyComponent },
 /*  { path: '**', redirectTo: '/404', pathMatch: 'full' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
