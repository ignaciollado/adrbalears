import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../services/article-content.service';
import { reqArticle } from '../Models/article-data.dto';

@Component({
  selector: 'app-common-content-viewer',
  templateUrl: './common-content-viewer.component.html',
  styleUrl: './common-content-viewer.component.scss'
})
export class CommonContentViewerComponent {
  public id:string | null = this.route.snapshot.paramMap.get('id')
  currentLang: string | undefined;
  public contenido: reqArticle | undefined 

  constructor( public translateService: TranslateService, private articleService: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) { }


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
  
      this.articleService.get(this.id)
          .subscribe(
            (resp:any) => {
              this.contenido = resp.data
           /*    this.contenidos = this.contenidos.filter( item => item.attributes.state === 1 )
              this.contenidos = this.contenidos.filter( item => item.attributes.language === this.currentLang )
              this.contenidos = this.contenidos.filter( item => item.relationships.category.data.id === this.id)  */
              console.log(this.id, this.contenido)
          })
  
          window.scroll(0,0)
    }

}
