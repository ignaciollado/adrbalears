import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { reqArticle } from '../../Models/article-data.dto';
import { WpPost } from '../../Models/wp-post-data.dto';
import { WpTag } from '../../Models/wp-tag.dto';
import { WPpostService } from '../../services/wp-post.service';
import { WpPageFeaturedMedia } from '../../Models/wp-page-featured-media.dto';

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
  public contenidoMedia: WpPageFeaturedMedia[] = []
  public wpTags: WpTag[] = []
  public wpPosts: WpPost[] = []
  public existingEvents: boolean = false

  listAgendaReady: boolean = false

  @Input () totalNewsToDisplay: string = "8"

  constructor( public translateService: TranslateService,
    private wpPostsList: WPpostService,
    private articleWPContent: WPpostService,
    private route: ActivatedRoute,
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
    this.getWPAgenda( this.wpCurrentLang, [31, 32, 33, 34], +this.newsToDisplay ) /* 31: agenda, 32: agenda-emprendre, 33: agenda-conectar, 34: agenda-proyectar */
    /* this.getWPPosts( this.wpCurrentLang, [27, 52, 53, 54], 9999 ) */
  }

  getWPAgenda(currentLanguage:number, categories: number[], itemsNumber: number) {
    if ( !itemsNumber ) {
      itemsNumber = +this.totalNewsToDisplay
    }
    this.wpPostsList.getAllPosts()
      .subscribe( (agendaItems:WpPost[]) => {
        const now = new Date
        this.wpAgenda = agendaItems
        this.wpAgenda = this.wpAgenda.filter((item : WpPost) => item.status === 'publish')
        this.wpAgenda = this.wpAgenda.filter((item : WpPost) => item.categories.includes(currentLanguage))
        this.wpAgenda.forEach((item:WpPost) => {
          if (item.categories.includes(categories[1])) {
            this.wpAgendaEmprender.push(item)
            this.existingEvents = true
          }
          if (item.categories.includes(categories[2])) {
            this.wpAgendaConectar.push(item)
            this.existingEvents = true
          }
          if (item.categories.includes(categories[3])) {
            this.wpAgendaProyectar.push(item)
            this.existingEvents = true
          }
        })
      }) 
    window.scroll(0,0)
  }

 /*  getWPPosts(currentLanguage:number, categories: number[], itemsNumber: number) {
    if (!itemsNumber) {
      itemsNumber = 9999
    }
    this.wpPostsList.getAllPosts()
      .subscribe((postItems: WpPost[]) => {
        this.wpPosts = postItems
        this.wpPosts = this.wpPosts.filter((item : WpPost) => item.status === 'publish')
        this.wpPosts = this.wpPosts.filter((item : WpPost) => item.categories.includes(currentLanguage))
        this.wpPosts.map((item:WpPost) => {
          this.getFeaturedMedia(item.featured_media)
        })
    })
  } */

  getFeaturedMedia (idMedia: number):any {
    this.articleWPContent.getOneFeaturedMedia(idMedia)
     .subscribe(
       (mediaItem: WpPageFeaturedMedia) => {
         this.contenidoMedia.push(mediaItem)
       })
  }
}
