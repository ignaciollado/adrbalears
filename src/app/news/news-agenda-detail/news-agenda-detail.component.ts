import { Component } from '@angular/core';
import { reqArticle, attrArticle } from '../../model/article-data.model';
import { ArticleContentService } from '../../services/article-content.service';
import { Router, ActivatedRoute,  } from '@angular/router';
@Component({
  selector: 'app-news-agenda-detail',
  templateUrl: './news-agenda-detail.component.html',
  styleUrl: './news-agenda-detail.component.scss'
})
export class NewsAgendaDetailComponent {

  public unaNoticia: reqArticle | undefined
  public unaNoticiaAttribute: attrArticle | undefined

  constructor( private getNoticia: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) {  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')
  }


  getUnaNotica ( id:string ) {

    this.getNoticia.get(id)

      .subscribe( (resp: any) => {
        this.unaNoticiaAttribute = resp.data.attributes
      })
  
    }

}
