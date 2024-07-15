import { Component } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';

@Component({
  selector: 'app-emprender',
  templateUrl: './emprender.component.html',
  styleUrl: './emprender.component.scss'
})
export class EmprenderComponent {
  public unaNoticia: reqArticle | undefined
  public contenido: reqArticle | undefined
  public currentLang: string = ''

  constructor( private articleService: ArticleContentService, ) {  }

    ngOnInit(): void {
      switch (localStorage.getItem('preferredLang')) {
        case 'cat':
          this.currentLang = 'ca-ES'
        break
        case 'cas':
          this.currentLang = 'es-ES'      
        break
        case 'en':
          this.currentLang = 'ca-ES'
        break
        default:
          this.currentLang = 'ca-ES'
      }
      this.getContent('3199')
    }

    getContent (id: string) {
      this.articleService.get(id)
          .subscribe(
            (resp:any) => {
              this.contenido = resp.data
          })
    }

}
