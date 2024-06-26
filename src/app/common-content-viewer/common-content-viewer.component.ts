import { Component } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../services/article-content.service';
import { IbemprenjoveService } from '../services/ibemprenjove.service';
import { reqArticle } from '../Models/article-data.dto';
import { CooperativaDTO } from '../Models/cooperativa.dto';

@Component({
  selector: 'app-common-content-viewer',
  templateUrl: './common-content-viewer.component.html',
  styleUrl: './common-content-viewer.component.scss'
})
export class CommonContentViewerComponent {
  public id:string | null = this.route.snapshot.paramMap.get('id')
  public program_id: string | null = this.route.snapshot.paramMap.get('idMainCat')
  currentLang: string | undefined;
  public contenido: reqArticle | undefined 
  public cooperativaList: CooperativaDTO[] = []
  public cooperativaListTemp: CooperativaDTO[] = []

  constructor( public translateService: TranslateService, 
    private articleService: ArticleContentService, 
    private cooperativaService: IbemprenjoveService,
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
      if (this.program_id !== '0') {
        this.getCooperativas ( +this.program_id, 3)
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

    getCooperativas(program: number, year: number) {
      this.cooperativaService.getAll(program, year)
        .subscribe((cooperativa:any[]) => {
          this.cooperativaListTemp = cooperativa
          this.cooperativaList = cooperativa['data'].map((item:any) => item)
        })

    }

}
