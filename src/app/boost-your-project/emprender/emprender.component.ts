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
  public unaNoticiaAttribute: attrArticle | undefined
  public currentLang: string = ''

  constructor( private getNoticia: ArticleContentService ) {  }

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
      this.getUnaNotica('3199')
    }

    getUnaNotica (id:string | null) {

      this.getNoticia.get(id)
        .subscribe( (resp: any) => {
          this.unaNoticiaAttribute = resp.data.attributes
        }) 
    
      }  

}
