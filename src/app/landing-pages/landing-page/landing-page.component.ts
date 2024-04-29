import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  @Input({ required: true }) landingMainTitle!: string;
  @Input({ required: true }) landingSlogan!: string;
  @Input({ required: true }) landingDescription!: string;
  @Input({ required: true }) landingNewsTag!: string;
  @Input({ required: true }) ctaTextRight!: string;
  @Input({ required: true }) ctaTextCenter!: string;
  @Input({ required: true }) ctaTextLeft!: string;
  @Input({ required: true }) landingContactData!: string;
}
