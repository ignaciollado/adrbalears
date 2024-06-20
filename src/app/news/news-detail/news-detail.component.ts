import { Component } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { Router, ActivatedRoute,  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent {

  public unaNoticia: reqArticle | undefined
  public unaNoticiaAttribute: attrArticle | undefined
  public currentLang: string = ''
  public subPath: string = ''
  public cabecera: string = ''

  constructor( public translateService: TranslateService, private getNoticia: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) {  }

  ngOnInit(): void {
    let id:string | null = this.route.snapshot.paramMap.get('id')
    let idCat = this.route.snapshot.paramMap.get('idCat')

    console.log ( id, idCat )
    switch (localStorage.getItem('preferredLang')) {
      case 'ca':
        this.currentLang = 'ca-ES'
        this.subPath = this.currentLang+"/"
      break
      case 'es':
        this.currentLang = 'es-ES'      
      break
      case 'en':
        this.currentLang = 'ca-ES'
        this.subPath = this.currentLang+"/"
      break
      default:
        this.currentLang = 'ca-ES'
        this.subPath = this.currentLang+"/"
    }

    this.cabecera = `../../assets/images/cabeceras/${this.cabecera}` 
    this.getUnaNotica(id)
  }

  getUnaNotica (id:string | null) {
    this.getNoticia.get(id)
      .subscribe( (resp: any) => {
        this.unaNoticiaAttribute = resp.data.attributes
      }) 
    }
}