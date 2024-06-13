import { Component, ViewChild } from '@angular/core';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms'; */
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../services/article-content.service';
import { genericDataDTO } from '../Models/generic-data.dto';
import { reqArticle } from '../Models/article-data.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})

export class BodyComponent {

	totalFound: string = ""
	showSearch: boolean = true
	public contenidos: reqArticle[] = []
	currentLang: string = ""
	isCollapsed:boolean = true
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/200/550.webp`)

	paused:boolean = false
	unpauseOnArrow:boolean = false
	pauseOnIndicator:boolean = false
	pauseOnHover:boolean = true
	pauseOnFocus:boolean = true
	genericDataContents: genericDataDTO[] = []
	theLeftLema: string = "Sección variable (según la <strong>PREGUNTA 03</strong>)"
	theCenterLema: string = "<h1>Solicita asesoramiento</h1>"
	theRightLema: string = "<h3>Ponte en contacto con nosotros</h3>"
	

  constructor(config: NgbTooltipConfig,
		private contentService: ArticleContentService,
		public translateService: TranslateService) {
			// customize default values of tooltips used by this component tree
			config.placement = 'bottom';
			config.triggers = 'hover';
		}

	ngOnInit() {
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
				this.theLeftLema  = "Sección variable (según la <strong>PREGUNTA 03</strong>)"
				this.theCenterLema = "<h1>Sol·licita assessorament</h1>"
				this.theRightLema = "<h3>Posa't en contacte amb nosaltres</h3>"
      break
      case 'cas':
        this.currentLang = 'es-ES'  
				this.theLeftLema = "Sección variable (según la <strong>PREGUNTA 03</strong>)"
				this.theCenterLema = "<h1>Solicita asesoramiento</h1>"
				this.theRightLema = "<h3>Ponte en contacto con nosotros</h3>"    
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

	@ViewChild('carousel', { static: true })
  carousel: NgbCarousel = new NgbCarousel;

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
