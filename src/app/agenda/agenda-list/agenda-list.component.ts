import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { reqArticle } from '../../Models/article-data.dto';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrl: './agenda-list.component.scss'
})
export class AgendaListComponent {
  public currentLang: string | undefined
  public newsToDisplay: string | null
  public agenda: reqArticle[] | undefined
  public agendaEmprender: reqArticle[] | undefined
  public agendaConectar: reqArticle[] | undefined
  public agendaProyectar: reqArticle[] | undefined


  @Input () totalNewsToDisplay: string = "8"

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
    this.getNoticias( this.currentLang, ['405', '406', '407'], this.newsToDisplay ) /* 405: agenda-emprendre, 406: agenda-conectar, 407: agenda-proyectar */
  }

  getNoticias(currentLanguage:string, categies: string[], articlesNumber: any) {


    if ( !articlesNumber ) {
      articlesNumber = this.totalNewsToDisplay
    }

    this.articleContent.getLastContent()
        .subscribe( (resp:any) => {
          this.agenda = resp.data
          this.agenda = this.agenda!.filter( (item : reqArticle) => item.attributes.state === 1)
          this.agenda = this.agenda.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`)
          this.agendaEmprender = this.agenda.filter( (item : reqArticle) => item.relationships.category.data.id === `${categies[0]}`)
          this.agendaConectar = this.agenda.filter( (item : reqArticle) => item.relationships.category.data.id === `${categies[1]}`)
          this.agendaProyectar = this.agenda.filter( (item : reqArticle) => item.relationships.category.data.id === `${categies[2]}`)


          console.log ("agenda: ", this.agenda)

        
        } ) 

      }

}
