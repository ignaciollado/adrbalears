import { Component, Input } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { genericMailDTO } from '../Models/generic-data.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {
  ctaForm: UntypedFormGroup
  subject: UntypedFormControl
  body: UntypedFormControl
  email: UntypedFormControl
  requester: UntypedFormControl
  contactPhone: UntypedFormControl
  infoLabel: string = ""
  showCtaForm: boolean = false
  showInfoLabel: boolean = false
  currentLang: string = ""
  formData: genericMailDTO

  @Input({ required: true }) ctaTextRight!: string;
  @Input({ required: true }) ctaTextCenter!: string;
  @Input({ required: true }) ctaTextLeft!: string;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private sendMail: MessageService ) {
    this.formData = new genericMailDTO('', '', '', '', '')

    this.email = new UntypedFormControl(this.formData.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),])
    this.requester = new UntypedFormControl("not indicated")
    this.contactPhone = new UntypedFormControl("not indicated")
    this.subject = new UntypedFormControl("Assessorament per un projecte")
    this.body = new UntypedFormControl(`M'agradaria que em contactessin per a rebre assessorament per al projecte ${this.route.snapshot.paramMap.get('projectName')}`)
    
    this.ctaForm = this.formBuilder.group({
      email: this.email,
      requester: this.requester,
      contactPhone: this.contactPhone,
      subject: this.subject,
      body: this.body,
    });

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
  }

  ctaFormClick() {
   this.showCtaForm = !this.showCtaForm
  }

  sendContactForm() {
      this.formData = this.ctaForm.value
      if (localStorage.getItem('preferredLang') === 'es-ES') {
        this.infoLabel ="Hemos recibido correctamente tu solicitud, pronto de contactaremos"
      } else {
        this.infoLabel ="Hem rebut correctament la teva sol·licitud, aviat et contactarem"
      }
      document.getElementById("emailCta").setAttribute("disabled", "disabled")
      document.getElementById("sendCta").innerHTML = `<i>${this.infoLabel}</i>`
      document.getElementById("sendCta").setAttribute("disabled", "disabled")
      this.sendMail.sendMail(this.formData)
      .subscribe((sendMailResult:any) => {
        console.log("sendMailResult: ", sendMailResult)
        this.showCtaForm = !this.showCtaForm
        this.showInfoLabel = !this.showInfoLabel
      })
  }
}
