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

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'about-adr-balears', component: AboutAdrBalearsComponent },
  { path: 'news-agenda-list/:newsToDisplay', component: ContainerNewsAgendaComponent },
  { path: 'news-agenda-detail/:alias/:id', component: NewsDetailComponent },
  { path: 'transparency-list', component: TransparencyListComponent },
  { path: 'transparency-detail/:alias/:id', component: TransparencyDetailComponent },
  { path: 'search-the-web-result-list/:searchTerm', component: SearchTheWebResultListComponent },
  { path: 'landing-page/:projectName/:contentID/:categoryID/:showLinks/:fasePro/:faseNewsToDisplay/:agendaCategory', component: LandingPageComponent },

  { path: 'iemprenjove/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'iemprenjove-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'iempren/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'iempren-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibtalent/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibtalent-es/:id/:idMainCat', component: CommonContentViewerComponent },

  { path: 'ibgestio-xecs/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibgestio-xecs-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibdigitalitzacio-xecs/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibdigitalitzacio-xecs-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'emblematics-balears/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'emblematics-balears-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibcomerc-a-escola/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibcomerc-a-escola-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'pa-daqui-forn-i-pastisseria/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'pa-daqui-forn-i-pastisseria-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'industria-local-sostenible/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'industria-local-sostenible-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibsostenibilitat-xecs/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibsostenibilitat-xecs-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibavals-industria/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibavals-industria-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'exposabyidi/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'exposabyidi-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibrelleu/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibrelleu-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'loop-disseny-i-circularitat/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'loop-disseny-i-circularitat-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibexporta-xecs/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'ibexporta-xecs-es/:id/:idMainCat', component: CommonContentViewerComponent },

  { path: 'invest-in-balearics/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'invest-in-balearics-es/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'pibs/:id/:idMainCat', component: CommonContentViewerComponent },
  { path: 'pibs-es/:id/:idMainCat', component: CommonContentViewerComponent },

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
