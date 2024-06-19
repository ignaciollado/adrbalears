import { Component, Input } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { genericMailDTO } from '../../Models/generic-data.dto';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  public totalNewsToDisplay: string = "4"
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

  public hasExternalLink1!: boolean  | null
  public hasExternalLink2!: boolean  | null
  public hasExternalLink3!: boolean  | null
  public hasExternalLink4!: boolean  | null
  public hasExternalLink5!: boolean  | null
  public hasExternalLink6!: boolean  | null
  public hasExternalLink7!: boolean  | null
  public hasExternalSite!: boolean  | null
  public hasExternalBackoffice!: boolean  | null
  public infoLabel:string = ""

  public unaNoticia: reqArticle | undefined
  public theContentAttributes: attrArticle | undefined

  public currentLang: string = ""
  formData: genericMailDTO
  contactForm: UntypedFormGroup
  subject: UntypedFormControl
  body: UntypedFormControl
  email: UntypedFormControl
  requester: UntypedFormControl
  contactPhone: UntypedFormControl
  showCtaForm: boolean = false
  showInfoLabel: boolean = false

  @Input({ required: true }) landingMainTitle: string = "Título del proyecto";
  @Input({ required: true }) landingSlogan: string = "\"ibemprėn, recursos para emprender un negocio en las Islas Baleares.\"";
  @Input({ required: true }) landingDescription: string = "";
  @Input({ required: true }) landingContactData!: string;

  constructor( private getNoticia: ArticleContentService, private route: ActivatedRoute, private formBuilder: FormBuilder, private sendMail: MessageService,
    private router: Router ) {
      this.formData = new genericMailDTO('', '', '', '', '')

      this.email = new UntypedFormControl(this.formData.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),])
      this.requester = new UntypedFormControl("not indicated")
      this.contactPhone = new UntypedFormControl("not indicated")
      this.subject = new UntypedFormControl("Sol·licitud d'alta al BUTLLETÍ")
      this.body = new UntypedFormControl("M'agradaria que em donessin d'alta en el seu BUTLLETÍ")
      
      this.contactForm = this.formBuilder.group({
        email: this.email,
        requester: this.requester,
        contactPhone: this.contactPhone,
        subject: this.subject,
        body: this.body,
      });

    }
  
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
        if ( resp.data.attributes.idcontenidoenlaceinteresuno.includes('https://')) {
          this.hasExternalLink1 = true
        } else {
          this.hasExternalLink1 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinteresdos.includes('https://')) {
          this.hasExternalLink2 = true
        } else {
          this.hasExternalLink2 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinterestres.includes('https://')) {
          this.hasExternalLink3 = true
        } else {
          this.hasExternalLink3 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinterescuatro.includes('https://')) {
          this.hasExternalLink4 = true
        } else {
          this.hasExternalLink4 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinterescinco.includes('https://')) {
          this.hasExternalLink5 = true
        } else {
          this.hasExternalLink5 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinteresseis.includes('https://')) {
          this.hasExternalLink6 = true
        } else {
          this.hasExternalLink6 = false
        }
        if ( resp.data.attributes.idcontenidoenlaceinteressiete.includes('https://')) {
          this.hasExternalLink7 = true
        } else {
          this.hasExternalLink7 = false
        }

        if ( Object.keys(resp.data.attributes.tieneportal)[0] === 'true') {
          this.hasExternalSite = true
        } else {
          this.hasExternalSite = false
        }
        if ( Object.keys(resp.data.attributes.tienebackoffice)[0] === 'true') {
          this.hasExternalBackoffice = true
        } else {
          this.hasExternalBackoffice = false
        }
      }) 
  }

  openExternalSite ( url: string) {
    window.open(url, "_blank");
  }

  sendContactForm() {
      this.formData = this.contactForm.value
      if (localStorage.getItem('preferredLang') === 'es-ES') {
        this.infoLabel ="Hemos recibido correctamente tu solicitud, pronto de contactaremos."
      } else {
        this.infoLabel ="Hem rebut correctament la teva sol·licitud, aviat et contactarem."
      }
      document.getElementById("email").setAttribute("disabled", "disabled")
      document.getElementById("sendMe").innerHTML = `<i>${this.infoLabel}</i>`
      document.getElementById("sendMe").setAttribute("disabled", "disabled")
      this.sendMail.sendMail(this.formData)
      .subscribe((sendMailResult:any) => {
        console.log("sendMailResult: ", sendMailResult)
        this.showCtaForm = !this.showCtaForm
        this.showInfoLabel = !this.showInfoLabel
      })
  }

}
