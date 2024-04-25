import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {
  @Input({ required: true }) ctaTextRight!: string;
  @Input({ required: true }) ctaTextCenter!: string;
  @Input({ required: true }) ctaTextLeft!: string;
}
