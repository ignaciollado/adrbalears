import { Component } from '@angular/core';
import { reqArticle, attrArticle } from '../../model/article-data.model';
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
    switch (this.translateService.currentLang) {
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
        /* Comprobar si hay una cabecera 'custom' en el campo 'cabecera' */
        /* if (this.unaNoticiaAttribute.cabecera && this.unaNoticiaAttribute.cabecera !== '{"imagefile":"","alt_text":""}') {
          console.log (this.unaNoticiaAttribute.cabecera)
          this.cabecera = this.unaNoticiaAttribute.cabecera
          if (this.cabecera.includes("imagefile")) {
            this.cabecera = Object.values(JSON.parse(this.cabecera))[0].toString() 
          }
          this.cabecera = `https://contents.idi.es/${ this.cabecera}`
         } */
      }) 
  
    }

}