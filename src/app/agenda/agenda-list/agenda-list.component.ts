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
  public agenda: reqArticle[] = []
  public agendaEmprender: reqArticle[] = []
  public agendaConectar: reqArticle[] = []
  public agendaProyectar: reqArticle[] = []
  listAgendaReady: boolean = false

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

    this.articleContent.getEveryThing()
        .subscribe( (resp:any) => {
          const now = new Date
          this.agenda = resp.data
          this.agenda = this.agenda.filter( (item : reqArticle) => item.attributes.state === 1)
          this.agenda = this.agenda.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`)
          this.agenda = this.agenda.filter( (item : reqArticle) => now.getDate() - new Date(item.attributes.publish_down).getDate() <= 0) 
          this.agenda.map((item:reqArticle) => {
            if (item.relationships.category.data.id === categies[0]) {
              this.agendaEmprender.push(item)
            }
            if (item.relationships.category.data.id === categies[1]) {
              this.agendaConectar.push(item)
            }
            if (item.relationships.category.data.id === categies[2]) {
              this.agendaProyectar.push(item)
            }
          })
          this.listAgendaReady = true
        } ) 
        window.scroll(0,0)
      }

}
