import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../services/article-content.service';
import { reqArticle } from '../Models/article-data.dto';

@Component({
  selector: 'app-common-content-viewer',
  templateUrl: './common-content-viewer.component.html',
  styleUrl: './common-content-viewer.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CommonContentViewerComponent {
  public id:string | null = this.route.snapshot.paramMap.get('id')
  public program_id: string | null = this.route.snapshot.paramMap.get('idMainCat')
  public currentLang: string | undefined;
  public contenido: reqArticle | undefined 
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
  
      this.getContent(this.id)
      if (this.program_id !== '0') { /* si no es 0, entonces es algún programa de iemprenjove */
        this.isProgramaIbemprenJove = true
        if (this.program_id === '2') {
          this.isJES = true
        }
        if (this.program_id === '3') {
          this.isJEA = true
        }
        if (this.program_id === '1') {
          this.isJEP = true
        }
        /* this.getCooperativas ( +this.program_id, 4) */
      }
      
      window.scroll(0,0)
    }


    getContent (id: string) {
      this.articleService.get(id)
          .subscribe(
            (resp:any) => {
              this.contenido = resp.data
          })
    }
}
