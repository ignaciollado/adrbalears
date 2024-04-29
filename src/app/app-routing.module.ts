import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsAgendaListComponent } from './news/news-agenda-list/news-agenda-list.component';
import { BodyComponent } from './body/body.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NewsAgendaDetailComponent } from './news/news-agenda-detail/news-agenda-detail.component';
import { SearchTheWebResultListComponent } from './searchTheWeb/search-the-web-result-list/search-the-web-result-list.component';
import { AboutAdrBalearsComponent } from './about-us/about-adr-balears/about-adr-balears.component';
import { TransparencyListComponent } from './transparency/transparency-list/transparency-list.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'about-adr-balears', component: AboutAdrBalearsComponent },
  { path: 'news-agenda-list/:newsToDisplay', component: NewsAgendaListComponent },
  { path: 'news-agenda-detail/:alias/:id', component: NewsAgendaDetailComponent },
  { path: 'transparency-list', component: TransparencyListComponent },
  { path: 'search-the-web-result-list/:searchTerm', component: SearchTheWebResultListComponent },
  { path: 'landing-page/:projectName', component: LandingPageComponent },

  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
