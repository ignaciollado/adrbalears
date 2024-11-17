import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { reqArticle } from '../../Models/article-data.dto';
import { WpPost } from '../../Models/wp-post-data.dto';
import { WpTag } from '../../Models/wp-tag.dto';
import { WPpostService } from '../../services/wp-post.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrl: './agenda-list.component.scss'
})
export class AgendaListComponent {
  public currentLang: string | undefined
  public wpCurrentLang: number
  public newsToDisplay: string | null
  public agenda: reqArticle[] = []
  public agendaEmprender: reqArticle[] = []
  public agendaConectar: reqArticle[] = []
  public agendaProyectar: reqArticle[] = []
  public wpAgenda: WpPost[] = []
  public wpAgendaEmprender: WpPost[] = []
  public wpAgendaConectar: WpPost[] = []
  public wpAgendaProyectar: WpPost[] = []
  public wpFeaturedMedia: string[] = []
  public wpTags: WpTag[] = []

  listAgendaReady: boolean = false

  @Input () totalNewsToDisplay: string = "8"

  constructor( public translateService: TranslateService, private articleContent: ArticleContentService, private agendaWPContent: WPpostService, private route: ActivatedRoute,
    private router: Router ) { 
      this.newsToDisplay = this.route.snapshot.paramMap.get("newsToDisplay")
  }

  ngOnInit(): void {
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
        this.wpCurrentLang = 25
        break
      case 'cas':
        this.currentLang = 'es-ES'
        this.wpCurrentLang = 24      
        break
      case 'en':
        this.currentLang = 'en-EN'
        this.wpCurrentLang = 26
        break
      default:
        this.currentLang = 'ca-ES'
        this.wpCurrentLang = 25
    }
    this.getAgenda( this.currentLang, ['405', '406', '407'], this.newsToDisplay ) /* 405: agenda-emprendre, 406: agenda-conectar, 407: agenda-proyectar */
    this.getWPAgenda( this.wpCurrentLang, [31, 32, 33, 34], +this.newsToDisplay ) /* 31: agenda, 32: agenda-emprendre, 33: agenda-conectar, 34: agenda-proyectar */
  }

  getAgenda(currentLanguage:string, categies: string[], itemsNumber: string) {
    if ( !itemsNumber ) {
      itemsNumber = this.totalNewsToDisplay
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

  getWPAgenda(currentLanguage:number, categies: number[], itemsNumber: number) {
    if ( !itemsNumber ) {
      itemsNumber = +this.totalNewsToDisplay
    }
    this.agendaWPContent.getAll()
      .subscribe( (resp:any) => {
        const now = new Date
        this.wpAgenda = resp.data
        console.log(this.wpAgenda)
        if (this.wpAgenda !== undefined) {
          this.wpAgenda = this.wpAgenda.filter( (item : WpPost) => item.status === 'publish')
          this.wpAgenda = this.wpAgenda.filter( (item : WpPost)  => item.categories.includes((categies[0])))
          this.wpAgenda = this.wpAgenda.filter( (item : WpPost) => item.categories.includes(currentLanguage))
          this.wpAgenda = this.wpAgenda.filter( (item : WpPost) => now.getDate() - new Date(item.date).getDate() <= 0) 
          this.wpAgenda.map((item:WpPost) => {
            if (item.categories.includes(categies[1])) {
              this.wpAgendaEmprender.push(item)
            }
            if (item.categories.includes(categies[2])) {
              this.wpAgendaConectar.push(item)
            }
            if (item.categories.includes(categies[3])) {
              this.wpAgendaProyectar.push(item)
            }
          })
        } else {
          console.log ("No agenda items found")
        }

      }) 
    window.scroll(0,0)
  }

}
