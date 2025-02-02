import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from '../../services/message.service';
import { SharedService } from '../../services/shared.service';
import { TramitsService } from '../../services/tramits.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-landing-page',
  templateUrl: './home-landing-page.component.html',
  styleUrl: './home-landing-page.component.scss'
})
export class HomeLandingPageComponent implements OnInit {
  currentLang: string ="es-ES"
  theLeftLema: string = "Nos gustaría ayudarte"
	theCenterLema: string = "<h1>Solicita asesoramiento</h1>"
	theRightLema: string = "Ponte en contacto con nosotros"
  alumnosT: number = 4065
  asesoramientos: number = 1020
  asistentes: number = 853
  ayudas: number = 0 /* data get from tramits.idi.es in real time */
  formSendMail!: FormGroup
  submitted: boolean = false
  successfullySend: boolean = false

  private modalService = inject(NgbModal)
	@ViewChild('content') infoDialog = {} as TemplateRef<string>;

  constructor( private formBuilder: FormBuilder, private sendMail: MessageService, 
    private sharedService: SharedService, private tramits: TramitsService ) {
    this.formSendMail = this.formBuilder.group( {
      contactName:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ["no s'indica"],
      body: ["Sol·licitud d'assessorament des-de la web ADR Balears"],
      acceptTerms: ['', [Validators.required]]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSendMail.controls;
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
    /* setInterval(this.incrementValue, 1000); */
    this.getTramitsByConvo('2024')
  }

  incrementValue() {
    this.alumnosT = ++this.alumnosT
    console.log (this.alumnosT) 
  }

  openHomePopUp(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'color-backdrop' });
	}

  onSubmit(): void {
    let responseOK: boolean = false
    this.submitted = true
    this.sendMail.sendMail(this.formSendMail.value,"Sol·licitud d'assessorament:", "Comunicació")
    .pipe(
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK )
        console.log ("enviado xxx")
      })
    )
    .subscribe(() => {
      console.log ("enviado")
    },
    (error: HttpErrorResponse) => {
      if ( error.status === 200 ) {
        responseOK = true
        this.successfullySend = true
        console.log ("enviado yyyy")
      }
      this.sharedService.errorLog(error)
      this.formSendMail.reset()
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK, error )
      })
    })
  }

    getTramitsByConvo(convo: string) {
      this.tramits.getAllXecsTramitsByConvo(convo)
        .subscribe( (items: any[]) => {
          console.log ("total solicitudes", items)
          this.ayudas = +items
      })
    }
}
