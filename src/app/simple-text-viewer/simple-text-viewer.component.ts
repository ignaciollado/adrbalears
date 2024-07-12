import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../services/article-content.service';
import { reqArticle } from '../Models/article-data.dto';


@Component({
  selector: 'app-simple-text-viewer',
  templateUrl: './simple-text-viewer.component.html',
  styleUrl: './simple-text-viewer.component.scss'
})
export class SimpleTextViewerComponent {
  public id:string | null = this.route.snapshot.paramMap.get('id')
  public program_id: string | null = this.route.snapshot.paramMap.get('idMainCat')
  currentLang: string | undefined;
  public contenido: reqArticle | undefined 

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
