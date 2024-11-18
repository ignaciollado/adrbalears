import { Component } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { Router, ActivatedRoute,  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WPpostService } from '../../services/wp-post.service';
import { WpPost } from '../../Models/wp-post-data.dto';
import { WpPageFeaturedMedia } from '../../Models/wp-page-featured-media.dto';
import { WpTag } from '../../Models/wp-tag.dto';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent {
  public unaNoticia: reqArticle | undefined
  public unaNoticiaAttribute: attrArticle | undefined
  public oneNew: WpPost
  public currentLang: string = ''
  public currentWPLang: string = ''
  public subPath: string = ''
  public cabecera: string = ''
  public contenidoMedia: WpPageFeaturedMedia
  public contenidoTag: WpTag[] = []
  public wpCurrentLang: number;

  constructor( public translateService: TranslateService, private getNoticia: ArticleContentService, 
    private getOneWPPost: WPpostService, private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {
    let id:string | null = this.route.snapshot.paramMap.get('id')
    let alias = this.route.snapshot.paramMap.get('alias')
    switch (localStorage.getItem('preferredLang')) {
      case 'ca':
        this.currentLang = 'ca-ES'
        this.wpCurrentLang = 25
        this.subPath = this.currentLang+"/"
      break
      case 'es':
        this.currentLang = 'es-ES'    
        this.wpCurrentLang = 24
      break
      case 'en':
        this.currentLang = 'ca-ES'
        this.wpCurrentLang = 26
        this.subPath = this.currentLang+"/"
      break
      default:
        this.currentLang = 'ca-ES'
        this.wpCurrentLang = 25
        this.subPath = this.currentLang+"/"
    }
    this.cabecera = `../../assets/images/cabeceras/${this.cabecera}` 
    //this.getOneNew(id)
    this.getWPOneNew(id)
  }

  getOneNew (id:string | null) {
    this.getNoticia.get(id)
      .subscribe( (resp: any) => {
        this.unaNoticiaAttribute = resp.data.attributes
        window.scroll(0,0)
    }) 
  }

  getWPOneNew (id:string | null) {
    this.getOneWPPost.getOne(id)
      .subscribe((item: WpPost) => {
        this.oneNew = item
        this.getFeaturedMedia(this.oneNew.featured_media)
        this.oneNew.tags.forEach((tagItem:number) => {
          this.getTags(tagItem)
        })
        window.scroll(0,0)
    }) 
  }

  getFeaturedMedia (idMedia: number):any {
    this.getOneWPPost.getOneFeaturedMedia(idMedia)
     .subscribe(
      (mediaItem: WpPageFeaturedMedia) => {
        this.contenidoMedia = mediaItem
      })
  }

  getTags (idTag: number):any {
    this.getOneWPPost.getOneTag(idTag)
     .subscribe(
      (tagItem: any) => {
        this.contenidoTag.push(tagItem)
      })
  }
}