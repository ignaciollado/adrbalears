import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  public showSearch: boolean = true
  public totalNewsToDisplay: string = "3"
  public landingNewsTag: string = "";
  public theRightLema: string = "Llamar al 699 000 000 (ejemplo)";
  public theCenterLema: string ="<strong>Llamada a la acción</strong><p>Mensaje que motive al usuario a llamar y botón</p>";
  public theLeftLema: string = "CTA";

  @Input({ required: true }) landingMainTitle: string = "Título del proyecto";
  @Input({ required: true }) landingSlogan: string = "\"Slogan o una prase que represente la esencia del proyecto\"";
  @Input({ required: true }) landingDescription: string = "<h2>Descripción</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>";

  @Input({ required: true }) landingContactData!: string;
}
