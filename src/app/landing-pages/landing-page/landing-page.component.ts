import { Component, Input } from '@angular/core';
import { reqArticle, attrArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { UriConversionService } from '../../services/uriConversion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { genericMailDTO } from '../../Models/generic-data.dto';
import { UriProjectConversionDTO } from '../../Models/uri-project-conversion.dto';

import { MessageService } from '../../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent {

  public totalNewsToDisplay: string = "4"
  public faseNewsToDisplay: string = "['11', '420', '421', '422']"
  public landingNewsTag: string = ""
  public theRightLema: string = ""
  public theCenterLema: string = "<strong>Sol·licita assessorament per aquest projecte<br>Posa't en contacte amb nosaltres</strong>"
  public theLeftLema: string = "<h2><strong>CTA</strong></h2>"
  public projectName: string | null = ""
  public contentID: string | null = ""
  public categoryID: string | null = ""
  public showLinks: string | null = ""
  public fasePro: string | null = ""
  public agendaCategory: string | null = ""

  public hasExternalLink1!: boolean | null
  public hasExternalLink2!: boolean | null
  public hasExternalLink3!: boolean | null
  public hasExternalLink4!: boolean | null
  public hasExternalLink5!: boolean | null
  public hasExternalLink6!: boolean | null
  public hasExternalLink7!: boolean | null
  public hasExternalSite!:  boolean | null
  public hasExternalBackoffice!: boolean | null
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
  uriProjectData: UriProjectConversionDTO
  completeURI: string = ""
  submitted: boolean = false

  @Input({ required: true }) landingMainTitle: string = "Título del proyecto";
  @Input({ required: true }) landingSlogan: string = "\"ibemprėn, recursos para emprender un negocio en las Islas Baleares.\"";
  @Input({ required: true }) landingDescription: string = "";
  @Input({ required: true }) landingContactData!: string;

  constructor( private getNoticia: ArticleContentService, private getTheUri: UriConversionService, private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private sendMail: MessageService, 
    private sharedService: SharedService ) {
      this.formData = new genericMailDTO('', '', '', '', '')

      this.email = new UntypedFormControl(this.formData.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),])
      this.requester = new UntypedFormControl(this.formData.email)
      this.contactPhone = new UntypedFormControl("not indicated")
      this.subject = new UntypedFormControl("Alta al NEWSLETTER")
      this.body = new UntypedFormControl("M'agradaria que em donessin d'alta en el seu BUTLLETÍ")
      
      this.contactForm = this.formBuilder.group({
        email: this.email,
        requester: this.requester,
        contactPhone: this.contactPhone,
        subject: this.subject,
        body: this.body,
      });

      this.getTheUriData()
      this.totalNewsToDisplay = "6"
      this.faseNewsToDisplay = "['11', '420', '421', '422']"
    }
  
  ngOnInit(): void {
    this.route.snapshot.url.forEach((uriSegment:any) => {this.completeURI += uriSegment.path+"/"})
    this.getTheUriData()
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
        this.theLeftLema  = "Ens agradaria ajudar-te"
				this.theCenterLema = "<h1>Sol·licita assessorament per aquest projecte</h1>"
				this.theRightLema = "<h3>Posa't en contacte amb nosaltres</h3>"
        break
      case 'cas':
        this.currentLang = 'es-ES'
        this.theLeftLema = "Nos gustaría ayudarte"
				this.theCenterLema = "<h1>Solicita asesoramiento para este proyecto</h1>"
				this.theRightLema = "<h3>Ponte en contacto con nosotros</h3>"
        break
      case 'en':
        this.currentLang = 'en-EN'
        break
      default:
        this.currentLang = 'ca-ES'
    }
  }

  getTheUriData () {
    this.getTheUri.getAll()
     .subscribe((resp: any) => {
      this.uriProjectData = resp.filter((uriToFilter: UriProjectConversionDTO) => uriToFilter.uri === this.completeURI)
      this.projectName = this.uriProjectData[0]['data'][0]
      this.contentID = this.uriProjectData[0]['data'][1]
      this.categoryID = this.uriProjectData[0]['data'][2]
      this.showLinks = this.uriProjectData[0]['data'][3]
      this.fasePro = this.uriProjectData[0]['data'][4]
      this.faseNewsToDisplay = this.uriProjectData[0]['data'][5]
      this.agendaCategory = this.uriProjectData[0]['data'][6]
      console.log(this.projectName, this.contentID, this.categoryID, this.showLinks, this.fasePro, this.faseNewsToDisplay, this.agendaCategory)
      localStorage.setItem("projectName", this.projectName)
      this.theLeftLema = this.projectName
      this.getTheContent(this.contentID)
    })
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
    let responseOK: boolean = false
    let errorResponse: any
    this.submitted = true
    this.formData = this.contactForm.value
    this.sendMail.sendMail(this.formData, "M'agradaria que em donessin d'alta en el seu BUTLLETÍ", 'Comunicació')
    .pipe (
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK, errorResponse )
      })
      )
      .subscribe(() => {    
      },
      (error: HttpErrorResponse) => {
        if ( error.status === 200 ) {
          responseOK = true
        }
        this.sharedService.errorLog(error)
        this.submitted = false
        this.contactForm.reset()
        finalize(async () => {
          await this.sharedService.managementToast( 'postFeedback', responseOK, error )
        })
      })
  }

}
