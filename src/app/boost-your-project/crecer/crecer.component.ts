import { Component } from '@angular/core';

@Component({
  selector: 'app-crecer',
  templateUrl: './crecer.component.html',
  styleUrl: './crecer.component.scss'
})
export class CrecerComponent {
    public currentLang: string = ''

  ngOnInit(): void {
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
      break
      case 'cas':
        this.currentLang = 'es-ES'      
      break
      case 'en':
        this.currentLang = 'ca-ES'
      break
      default:
        this.currentLang = 'ca-ES'
    }
   
  }

}
