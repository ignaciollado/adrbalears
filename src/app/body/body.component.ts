import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ContentService } from '../services/content.service';
import { genericDataDTO } from '../model/generic-data.model';
import { SearchTheWebService } from '../services/search-the-web.service';
import { reqArticle } from '../model/article-data.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})

export class BodyComponent {

	searchTheWebForm!: FormGroup
	totalFound: string = ""
	public contenidos: reqArticle[] = []
	currentLang: string = ""
	isCollapsed:boolean = true
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/870/500`)

	paused = false
	unpauseOnArrow = false
	pauseOnIndicator = false
	pauseOnHover = true
	pauseOnFocus = true
	genericDataContents: genericDataDTO[] = []
	theLeftLema: string = "Sección variable (Pregunta3)"
	theCenterLema: string = "<h1>Llamadas a la acción</h1><p>Mensaje que motive al usuario a conectar a través del formulario más apropiado y botón que redirija al mismo</p>"
	theRightLema: string = "Solicitar Asesoramiento<br>para mi StartUp"

  constructor(config: NgbTooltipConfig,
		private contentService: ContentService,
		private formBuilder: FormBuilder,
		public translateService: TranslateService, 
		private searchService: SearchTheWebService) {
				// customize default values of tooltips used by this component tree
				config.placement = 'bottom';
				config.triggers = 'hover';
				}

	createForm() {
    this.searchTheWebForm = this.formBuilder.group( {
      searchTerm: [ '', [Validators.required ] ]
    } )
  }

	get searchTerm() {
    return this.searchTheWebForm.get('searchTerm');
  }

	ngOnInit() {
		this.createForm()
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
			.subscribe((response:genericDataDTO[]) => {
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

	onSubmit(searchTheWebForm: any) {
		let resultCounter = document.getElementById("totalResults")
    if (searchTheWebForm.valid) {
			resultCounter?.classList.remove("ocultar")
			this.totalFound = "searching..."
      const searchTerm: string = searchTheWebForm.value.searchTerm

      this.searchService.getArticles()
      .subscribe( (result: any) => {
        this.contenidos = result.data
        this.contenidos = result.data.filter( (item : reqArticle) => item.attributes.language === `${this.currentLang}`) 
        this.contenidos = this.contenidos.filter( item => item.attributes.text.toUpperCase().includes(searchTerm.trim().toUpperCase()) )
        this.totalFound = this.contenidos.length.toString()
      }, (err) => {
        console.log ( err.msg );
      });

    } else {
      console.error('Contact form is in an invalid state: ', searchTheWebForm)
    } 
  }
}
