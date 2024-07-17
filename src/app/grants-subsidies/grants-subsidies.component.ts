import { Component } from '@angular/core';

@Component({
  selector: 'app-grants-subsidies',
  templateUrl: './grants-subsidies.component.html',
  styleUrl: './grants-subsidies.component.scss'
})
export class GrantsSubsidiesComponent {
  currentLang: string ="ca-ES";
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
}
