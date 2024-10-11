import { Component } from '@angular/core';


@Component({
  selector: 'app-home-landing-page',
  templateUrl: './home-landing-page.component.html',
  styleUrl: './home-landing-page.component.scss'
})
export class HomeLandingPageComponent {
  currentLang: string ="es-ES"
  theLeftLema: string = "Nos gustaría ayudarte"
	theCenterLema: string = "<h1>Solicita asesoramiento</h1>"
	theRightLema: string = "Ponte en contacto con nosotros"
  alumnosT: number = 227
  asesoramientos: number = 121
  asistentes: number = 227

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
    setInterval(this.incrementValue, 1000);
  }

  incrementValue() {
    this.alumnosT = ++this.alumnosT
    console.log (this.alumnosT) 
  }
}
