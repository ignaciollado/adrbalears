import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsAgendaListComponent } from './news/news-agenda-list/news-agenda-list.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {
    path: '',
    component: BodyComponent
  },
  {
    path: 'news-agenda-list',
    component: NewsAgendaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
