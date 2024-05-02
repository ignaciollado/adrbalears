import { Component, ViewChild } from '@angular/core';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms'; */
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../services/article-content.service';
import { genericDataDTO } from '../model/generic-data.model';
import { reqArticle } from '../model/article-data.model';
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
	theCenterLema: string = "<h1>Llamadas a la acción</h1><p>Mensaje que motive al usuario a conectar a través del formulario más apropiado y botón que redirija al mismo</p>"
	theRightLema: string = "Solicitar Asesoramiento<br>para mi StartUp"

  constructor(config: NgbTooltipConfig,
		private contentService: ArticleContentService,
		public translateService: TranslateService) {
			// customize default values of tooltips used by this component tree
			config.placement = 'bottom';
			config.triggers = 'hover';
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
