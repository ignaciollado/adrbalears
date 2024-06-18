import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {
  ctaForm!: FormGroup | undefined
  infoLabel: string = ""
  showCtaForm: boolean = false
  currentLang: string = ""

  @Input({ required: true }) ctaTextRight!: string;
  @Input({ required: true }) ctaTextCenter!: string;
  @Input({ required: true }) ctaTextLeft!: string;

  constructor( private formBuilder: FormBuilder ) {}

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
    this.ctaForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });


  }

  ctaFormClick() {
   this.showCtaForm = !this.showCtaForm
   console.log (this.showCtaForm)
  }

  sendContactForm() {
    if (this.ctaForm!.valid) {
      const datosFormulario = this.ctaForm.value
      console.log (datosFormulario)

      if (localStorage.getItem('preferredLang') === 'es-ES') {
        this.infoLabel ="Hemos recibido tu solicitud de contacto, pronto te contactaremos."
      } else {
        this.infoLabel ="Hem rebut la teva sol·licitud de contacte, aviat et contactarem."
      }

      document.getElementById("email").setAttribute("disabled", "disabled")
      document.getElementById("contactMe").setAttribute("disabled", "disabled")
    } else {
  
    }
  }
}
