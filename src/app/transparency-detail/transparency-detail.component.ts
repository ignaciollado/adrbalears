import { Component, OnInit } from '@angular/core';
import { reqArticle, attrArticle } from '../Models/article-data.dto';
import { ArticleContentService } from '../services/article-content.service';
import { Router, ActivatedRoute,  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transparency-detail',
  templateUrl: './transparency-detail.component.html',
  styleUrl: './transparency-detail.component.scss'
})
export class TransparencyDetailComponent {
  public articles: reqArticle[] = []
  public loadingData: boolean = true
  public detalleTransparenciaAttribute: reqArticle | undefined
  public currentLang: string = ''
  public subPath: string = ''
  public cabecera: string = ''

  constructor( public translateService: TranslateService, private articleService: ArticleContentService, 
    private route: ActivatedRoute,
    private router: Router ) { }


  ngOnInit(): void {
    let id:string | null = this.route.snapshot.paramMap.get('id') 
  
      switch (localStorage.getItem('preferredLang')) {
        case 'cat':
          this.currentLang = 'ca-ES'
          this.subPath = this.currentLang+"/"
        break
        case 'cas':
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
  
      this.getdetalleTransparencia( id, this.currentLang )
  
      this.cabecera = `${this.subPath}transparencia_idi.webp`
      this.cabecera = `../../assets/images/cabeceras/${this.cabecera}` 
    }  

    getdetalleTransparencia( currentCategory:string | null, currentLanguage:string ) {

      this.articleService.getEveryThing()
          .subscribe( (resp:any) => {
           console.log ("el contenido es: ", resp.data, currentCategory)
            this.articles = resp.data
            this.articles = this.articles.filter( (item : reqArticle) => item.attributes.state === 1)
            this.articles = this.articles.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`) 
            this.articles = this.articles.filter( (item : reqArticle) => item.relationships.category.data.id === `${currentCategory}`)
            this.loadingData = false
          } ) 
  
        }     

}
