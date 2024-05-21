import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { BodyComponent } from './body/body.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { SearchTheWebResultListComponent } from './searchTheWeb/search-the-web-result-list/search-the-web-result-list.component';
import { AboutAdrBalearsComponent } from './about-us/about-adr-balears/about-adr-balears.component';
import { TransparencyListComponent } from './transparency/transparency-list/transparency-list.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { ContainerNewsAgendaComponent } from './container-news-agenda/container-news-agenda.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'about-adr-balears', component: AboutAdrBalearsComponent },
  { path: 'news-agenda-list/:newsToDisplay', component: ContainerNewsAgendaComponent },
  { path: 'news-agenda-detail/:alias/:id', component: NewsDetailComponent },
  { path: 'transparency-list', component: TransparencyListComponent },
  { path: 'search-the-web-result-list/:searchTerm', component: SearchTheWebResultListComponent },
  { path: 'landing-page/:projectName/:showLinks', component: LandingPageComponent },

  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
