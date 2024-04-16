import { Component, AfterViewInit } from '@angular/core';
import * as CookieConsent from 'vanilla-cookieconsent';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  ngAfterViewInit(): void{
    CookieConsent.run({

      categories: {
          necessary: {
              enabled: true,  // this category is enabled by default
              readOnly: true  // this category cannot be disabled
          },
          analytics: {}
      },
  
      language: {
          default: 'en',
          translations: {
              en: {
                  consentModal: {
                      title: 'Usamos cookies',
                      description: 'Cookie modal description',
                      acceptAllBtn: 'Aceptar todo',
                      acceptNecessaryBtn: 'Rechazar todo',
                      showPreferencesBtn: 'Manage Individual preferences'
                  },
                  preferencesModal: {
                      title: 'Gestionar cookies',
                      acceptAllBtn: 'Aceptar todo',
                      acceptNecessaryBtn: 'Rechazar todo',
                      savePreferencesBtn: 'Aceptar selección actual',
                      closeIconLabel: 'Cerrar modal',
                      sections: [
                          {
                              title: 'Somebody said ... cookies?',
                              description: 'I want one!'
                          },
                          {
                              title: 'Strictly Necessary cookies',
                              description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',
  
                              //this field will generate a toggle linked to the 'necessary' category
                              linkedCategory: 'necessary'
                          },
                          {
                              title: 'Performance and Analytics',
                              description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                              linkedCategory: 'analytics'
                          },
                          {
                              title: 'More information',
                              description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                          }
                      ]
                  }
              }
          }
      }
  });
}

}
