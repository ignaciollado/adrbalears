import { Component, Input } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  public totalNewsToDisplay: string = "3"
  public landingNewsTag: string = ""
  public theRightLema: string = ""
  public theCenterLema: string = "<strong>Llamada a la acción</strong><p>Mensaje que motive al usuario a llamar y botón</p>"
  public theLeftLema: string = "<h2><strong>CTA</strong></h2>"
  public projectName:string | null = ""
  public contentID:string | null = ""
  public categoryID:string | null = ""
  public showLinks: string | null = ""
  public fasePro: string | null = ""
  public faseNewsToDisplay: string | null = ""
  public agendaCategory: string | null = ""

  public hasExternalSite!: boolean  | null 
  public unaNoticia: reqArticle | undefined
  public theContentAttributes: attrArticle | undefined
  currentLang: string = ""

  @Input({ required: true }) landingMainTitle: string = "Título del proyecto";
  @Input({ required: true }) landingSlogan: string = "\"ibemprėn, recursos para emprender un negocio en las Islas Baleares.\"";
  @Input({ required: true }) landingDescription: string = "";
  @Input({ required: true }) landingContactData!: string;

  constructor( private getNoticia: ArticleContentService, private route: ActivatedRoute,
    private router: Router ) {}
  
  ngOnInit(): void {
    this.projectName = this.route.snapshot.paramMap.get('projectName')
    this.contentID = this.route.snapshot.paramMap.get('contentID')
    this.categoryID = this.route.snapshot.paramMap.get('categoryID')
    this.showLinks = this.route.snapshot.paramMap.get('showLinks')
    this.fasePro = this.route.snapshot.paramMap.get('fasePro')
    this.faseNewsToDisplay = this.route.snapshot.paramMap.get('faseNewsToDisplay')
    this.agendaCategory = this.route.snapshot.paramMap.get('agendaCategory')


    this.getTheContent(this.contentID)

    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
        this.theLeftLema  = "Secció variable (segons la <strong>PREGUNTA 03</strong>)"
				this.theCenterLema = "<h1>Sol·licita assessorament</h1>"
				this.theRightLema = "<h3>Posa't en contacte amb nosaltres</h3>"
        break
      case 'cas':
        this.currentLang = 'es-ES'
        this.theLeftLema = "Sección variable (según la <strong>PREGUNTA 03</strong>)"
				this.theCenterLema = "<h1>Solicita asesoramiento</h1>"
				this.theRightLema = "<h3>Ponte en contacto con nosotros</h3>"    
        break
      case 'en':
        this.currentLang = 'en-EN'
        break
      default:
        this.currentLang = 'ca-ES'
      }
  }

  getTheContent (id:string | null) {
    this.getNoticia.get(id)
      .subscribe( (resp: any) => {
        this.theContentAttributes = resp.data.attributes
        if ( Object.keys(resp.data.attributes.hayportal)[0] === 'true') {
          this.hasExternalSite = true
        } else {
          this.hasExternalSite = false
        }
      }) 
  }

  openExternalSite ( url: string) {
    window.open(url, "_blank");
  }

}
