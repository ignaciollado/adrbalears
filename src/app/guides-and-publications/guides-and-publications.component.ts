import { Component } from '@angular/core';

@Component({
  selector: 'app-guides-and-publications',
  templateUrl: './guides-and-publications.component.html',
  styleUrl: './guides-and-publications.component.scss'
})
export class GuidesAndPublicationsComponent {
  public currentLang: string | undefined
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
