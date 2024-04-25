import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  currentLang: string | undefined
  constructor() {}
 
  ngOnInit(): void {
    this.currentLang = "cas"
  }
}
