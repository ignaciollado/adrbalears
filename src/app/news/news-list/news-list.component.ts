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

  public noticias: reqArticle[] = []
  public noticiasTemp: reqArticle[] = []

  public noticiasAttributes: attrArticle | undefined
  public currentLang: string | undefined
  public newsToDisplay: string | null
	actualProjectName : string = ""
	actualProjectFase: string = ""
  listNewsReady: boolean = false

  @Input () totalNewsToDisplay: string
  @Input () faseNewsToDisplay: string

  constructor( public translateService: TranslateService, private articleContent: ArticleContentService, private route: ActivatedRoute ) {
    this.newsToDisplay = this.route.snapshot.paramMap.get("newsToDisplay")
  }

  ngOnInit(): void {
   	this.actualProjectName = this.route.snapshot.paramMap.get('projectName')
		this.actualProjectFase = this.route.snapshot.paramMap.get('fasePro')
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
    console.log ("Fase to display: ", this.faseNewsToDisplay, this.totalNewsToDisplay)
    this.getNoticias(this.currentLang, ['11', '420', '421', '422'], this.newsToDisplay) /* 11 id de la categoría NOTICIA */
  }

  getNoticias(currentLanguage:string, currentCategory: string[], articlesNumber: any) {
    let interesadoEn: string | null, objetivoPrincipal: string | null, situacionActual: string | null
    /* Obtiene el perfíl del usuario según el cuestionario 'Personalice su experiencia' */
    interesadoEn = localStorage.getItem("interesadoEn")
    objetivoPrincipal = localStorage.getItem("objetivoPrincipal")
    situacionActual = localStorage.getItem("situacionActual")

    if ( !articlesNumber ) {
      articlesNumber = this.totalNewsToDisplay
    }
    
    this.articleContent.getAll()
        .subscribe( (resp:any) => {
          this.noticias = resp.data
          this.noticias = this.noticias.filter( (item : reqArticle)  => item.attributes.state === 1)
          this.noticias = this.noticias.filter( (item : reqArticle)   => item.attributes.language === `${currentLanguage}`) 
          this.noticias = this.noticias.filter( (item : reqArticle)   => currentCategory.includes(item.relationships.category.data.id))
          this.listNewsReady = true
          if (this.actualProjectFase) {
            this.noticias.map((item:reqArticle) => {
              if (Object.values(item.attributes.tags).includes(this.actualProjectFase)) {
                this.noticiasTemp.push(item)
              }
            })
            this.noticias = this.noticiasTemp
          }
          if (this.newsToDisplay != '9999') {
            this.noticias = this.noticias.slice(0, articlesNumber) /* The last 'articlesNumber' news published */
          }
        } ) 
        window.scroll(0,0)
  }

}