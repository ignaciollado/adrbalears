import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})

export class NewsListComponent implements OnInit {

  public noticias: reqArticle[] | undefined
  public noticiasAttributes: attrArticle | undefined
  public currentLang: string | undefined
  public newsToDisplay: string | null

  @Input () totalNewsToDisplay: string = "4"
  @Input () faseNewsToDisplay: string = "11"


  constructor( public translateService: TranslateService, private articleContent: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) {
      this.newsToDisplay = this.route.snapshot.paramMap.get("newsToDisplay")
     }

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
    this.getNoticias(this.currentLang, this.faseNewsToDisplay, this.newsToDisplay) /* 11 id de la categoría NOTICIA */
  }

  getNoticias(currentLanguage:string, currentCategory: string, articlesNumber: any) {

    let interesadoEn: string | null, objetivoPrincipal: string | null, situacionActual: string | null
    /* Obtiene el perfíl del usuario según el cuestionario 'Personalice su experiencia' */
    interesadoEn = localStorage.getItem("interesadoEn")
    objetivoPrincipal = localStorage.getItem("objetivoPrincipal")
    situacionActual = localStorage.getItem("situacionActual")

    if ( !articlesNumber ) {
      articlesNumber = this.totalNewsToDisplay
    }
    
    console.log (currentCategory, currentLanguage)

    this.articleContent.getLastContent()
        .subscribe( (resp:any) => {
          this.noticias = resp.data
          this.noticias = this.noticias!.filter( (item : reqArticle) => item.attributes.state === 1)
          this.noticias = this.noticias.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`) 
          this.noticias = this.noticias.filter( (item : reqArticle) => item.relationships.category.data.id === `${currentCategory}`)
          console.log (">>>>> ", this.noticias)
/*           this.noticias.map((item:reqArticle) => {
            if (item.attributes.state === 1) {
              console.log ("es uno", this.noticias?.indexOf(item), item.relationships.category.data.id, currentCategory)
              this.noticias?.splice(this.noticias?.indexOf(item), 1)
            }
          })  */
          if (this.newsToDisplay != '9999') {
            this.noticias = this.noticias.slice(0, articlesNumber) /* The last 'articlesNumber' news published */
          }
          console.log ("---->", this.noticias)
        } ) 

      }

}
