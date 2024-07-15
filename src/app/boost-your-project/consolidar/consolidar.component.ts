import { Component } from '@angular/core';

@Component({
  selector: 'app-consolidar',
  templateUrl: './consolidar.component.html',
  styleUrl: './consolidar.component.scss'
})
export class ConsolidarComponent {
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
