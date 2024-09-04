import { Component, Input } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { genericMailDTO } from '../Models/generic-data.dto';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {
  ctaForm: UntypedFormGroup
  subject: UntypedFormControl
  email: UntypedFormControl
  requester: UntypedFormControl
  contactPhone: UntypedFormControl
  infoLabel: string = ""
  showCtaForm: boolean = false
  showInfoLabel: boolean = false
  currentLang: string = ""
  formData: genericMailDTO
  submitted: boolean = false

  @Input({ required: true }) ctaTextRight!: string;
  @Input({ required: true }) ctaTextCenter!: string;
  @Input({ required: true }) ctaTextLeft!: string;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private sendMail: MessageService, private sharedService: SharedService ) {
    this.formData = new genericMailDTO('', '', '', '', '')

    this.email = new UntypedFormControl(this.formData.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),])
    this.requester = new UntypedFormControl("not indicated")
    this.contactPhone = new UntypedFormControl("not indicated")
    this.subject = new UntypedFormControl("Assessoria per a un projecte")
    
    this.ctaForm = this.formBuilder.group({
      email: this.email,
      requester: this.requester,
      contactPhone: this.contactPhone,
      subject: this.subject
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
    let responseOK: boolean = false
    let errorResponse: any
    this.submitted = true
    this.formData = this.ctaForm.value
    this.sendMail.sendMail(this.formData, `M'agradaria que em contactessin per a rebre assessorament per al projecte ${this.ctaTextLeft}`, this.ctaTextLeft)
    .pipe (
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK, errorResponse )
      })
      )
      .subscribe((sendMailResult:any) => {
      },
      (error: HttpErrorResponse) => {
        if ( error.status === 200 ) {
          responseOK = true
        }
        this.sharedService.errorLog(error)
        this.submitted = false
        this.ctaForm.reset()
        finalize(async () => {
          await this.sharedService.managementToast( 'postFeedback', responseOK, error )
        })
      })
  }
}
