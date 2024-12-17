import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../../services/article-content.service';
import { reqArticle } from '../../Models/article-data.dto';

@Component({
  selector: 'app-premis',
  templateUrl: './premis.component.html',
  styleUrl: './premis.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class PremisComponent {
  public id:string | null = this.route.snapshot.paramMap.get('id')
  public program_id: string
  public currentLang: string | undefined
  public contenido: reqArticle | undefined
  public textoArticulo: string

  public isProgramaIbemprenJove: boolean = false
  public isJES: boolean = false
  public isJEA: boolean = false
  public isJEP: boolean = false

  constructor( public translateService: TranslateService, 
    private articleService: ArticleContentService, 
    private route: ActivatedRoute,
    private router: Router ) { }

    ngOnInit(): void {
      switch (localStorage.getItem('preferredLang')) {
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
  
      if (this.id !== '0') { /* si no es 0, entonces es algún programa de iemprenjove */
        this.isProgramaIbemprenJove = true
        if (this.id === '2') {
          this.program_id = '3388'
          this.isJES = true
        }
        if (this.id === '3') {
          this.program_id = '3389'
          this.isJEA = true
        }
        if (this.id === '1') {
          this.program_id = '3390'
          this.isJEP = true
        }
      }
      this.getContent(this.program_id)
      window.scroll(0,0)
    }


    getContent (id: string) {
      this.articleService.get(id)
          .subscribe(
            (resp:any) => {
              this.contenido = resp.data
              console.log (this.contenido)
              this.textoArticulo = this.contenido.attributes.text
          })
    }
}
