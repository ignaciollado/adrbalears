import { ViewportScroller } from '@angular/common';
import { Component, inject, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as CookieConsent from 'vanilla-cookieconsent';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


constructor(private scroller: ViewportScroller, private router: Router,) {}
    
private offcanvasService = inject(NgbOffcanvas);
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
          default: 'cas',
          translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'Cookie modal description',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
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
            },
            cas: {
                consentModal: {
                    title: 'Usamos cookies',
                    description: 'Descripción de las cookies',
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
                            title: '¿Qué son las cookies?',
                            description: 'son archivos de texto con pequeños datos, como un nombre de usuario y contraseña, que se utilizan para identificar tu ordenador cuando utilizas una red. Se utilizan cookies específicas para identificar a usuarios concretos y mejorar su experiencia de navegación por la web. Los datos almacenados en una cookie son creados por el servidor al conectarte. Estos datos se etiquetan con un ID exclusivo para ti y tu ordenador. Cuando la cookie se intercambia entre un ordenador y el servidor de la red, este último lee el ID y sabe qué información específica mostrarte.'
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
                            title: 'Más información',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            }
          }
      }
  });
}

openCustomPanelClass(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { panelClass: 'bg-info' });
}

sedeElectronica(): void {
    window.open('https://pre-idi.sedipualba.es', '_blank');
}

goDown1() {
    console.log("estoy en goDown1")
    this.scroller.scrollToAnchor("#solicitar-asesoramiento");
  }

  goDown2() {
    //this.scroller.scrollToAnchor("targetGreen");
    document.getElementById("solicitar-asesoramiento")!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  goDown3() {
    console.log("estoy en goDown3")
    this.router.navigate([], { fragment: "logotipo" });
  }

}
