import { Component, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../../services/article-content.service';
import { genericDataDTO } from '../../model/generic-data.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
	@Input({ required: false }) showCustomProject: boolean = true
	@Input({ required: false }) displayLinks: boolean = true

  currentLang: string = ""
	isCollapsed: boolean = true
	twoColumns: boolean = false
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/912/500`)

	paused:boolean = false
	unpauseOnArrow:boolean = false
	pauseOnIndicator:boolean = false
	pauseOnHover:boolean = true
	pauseOnFocus:boolean = true
	genericDataContents: genericDataDTO[] = []

  constructor(config: NgbTooltipConfig,
		private contentService: ArticleContentService,
		public translateService: TranslateService ) {
			// customize default values of tooltips used by this component tree
			config.placement = 'bottom'
			config.triggers = 'hover'
		}

  ngOnInit() {
    switch (this.translateService.currentLang) {
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
		this.contentService.getAll()
			.subscribe((response:any[]) => {
				this.genericDataContents = response;
			})
	}

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel = new NgbCarousel;


  togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

  onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}

}
