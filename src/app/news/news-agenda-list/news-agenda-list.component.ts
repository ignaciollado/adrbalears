import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { reqArticle, attrArticle } from '../../model/article-data.model';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-agenda-list',
  templateUrl: './news-agenda-list.component.html',
  styleUrl: './news-agenda-list.component.scss'
})
export class NewsAgendaListComponent implements OnInit {

  public noticias: reqArticle[] | undefined; 
  public noticiasAttributes: attrArticle | undefined
  public currentLang: string | undefined
  public id:number = +!this.route.snapshot.paramMap.get('id')

  constructor( public translateService: TranslateService, private articleContent: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {

    switch (this.translateService.currentLang) {
      case 'cat':
        this.currentLang = 'ca-ES'
      break
      case 'cas':
        this.currentLang = 'es-ES'      
      break
      case 'en':
        this.currentLang = 'en-EN'
      break
      default:
        this.currentLang = 'ca-ES'
    }
    this.getNoticias(this.currentLang, '11', 24)
  }

  getNoticias(currentLanguage:string, currentCategory: string, articlesNumber: number) {
 
    this.articleContent.getAll()
        .subscribe( (resp:any) => {
          this.noticias = resp.data
          this.noticias = this.noticias!.filter( (item : reqArticle) => item.attributes.state === 1)
          this.noticias = this.noticias.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`) 
          this.noticias = this.noticias.filter( (item : reqArticle) => item.relationships.category.data.id === `${currentCategory}`)
          if (this.id !=9999) {
            this.noticias = this.noticias.slice(0,articlesNumber) /* Last articlesNumber news published */
          }
        
        } ) 

      }

}
