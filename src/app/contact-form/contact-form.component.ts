import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { genericMailDTO } from '../Models/generic-data.dto';
import { MessageService } from '../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})

export class ContactFormComponent {
  contactForm: FormGroup
  formData: genericMailDTO
  submitted: boolean = false
  currentLang: string = ""

  constructor(private formBuilder: FormBuilder, private sendMail: MessageService, private sharedService: SharedService,) { 
    this.formData = new genericMailDTO('', '', '', '', '')
  }

  ngOnInit() {

    switch ( localStorage.getItem('preferredLang') ) {
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


    this.contactForm = this.formBuilder.group({
      contactName:  ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.minLength, Validators.maxLength]],
      body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  onSubmit() {
    let responseOK: boolean = false
    this.submitted = true
    this.formData = this.contactForm.value
    this.sendMail.sendMail(this.formData, "Consulta des-de la web corporativa:", 'Comunicació')
    .pipe(
      finalize(async () => {
        await this.sharedService.managementToast( 'postFeedback', responseOK )
      })
    )
    .subscribe(() => {
      responseOK = true
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
