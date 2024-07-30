import { Component, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../../services/article-content.service';
import { SliderHomeService } from '../../services/sliderHome.service';
import { IbestatService } from '../../services/ibestat.service';
import { genericDataDTO } from '../../Models/generic-data.dto';
import { SliderHomeDTO } from '../../Models/slider-home.dto';
import { DatasetsIBESTATDTO } from '../../Models/ibestat.dto';
import { UriConversionService } from '../../services/uriConversion.service';
import { UriProjectConversionDTO } from '../../Models/uri-project-conversion.dto';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { attrArticle } from '../../Models/article-data.dto';

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
  /* images = [62, 83, 466, 965, 982, 1043].map((n) => `https://picsum.photos/id/${n}/912/500`) */
	public slides: SliderHomeDTO[] = []

	paused:boolean = false
	unpauseOnArrow:boolean = true
	pauseOnIndicator:boolean = false
	pauseOnHover:boolean = true
	pauseOnFocus:boolean = true
	genericDataContents: genericDataDTO[] = []
	ibestatDataSets: DatasetsIBESTATDTO[] = []
	oneContentAttributes: attrArticle
	uriProjectData: UriProjectConversionDTO
	actualProjectName : string = ""
	actualProjectID: string = ""
	completeURI: string = ""
  
	constructor(config: NgbTooltipConfig, private getNoticia: ArticleContentService, private getTheUri: UriConversionService,
		private contentService: ArticleContentService, private slideHomeService: SliderHomeService, private route: ActivatedRoute,
		public translateService: TranslateService,
		private ibestatService: IbestatService ) {
			// customize default values of tooltips used by this component tree
			config.placement = 'bottom'
			config.triggers = 'hover'
		}

  ngOnInit() {
		this.route.snapshot.url.forEach((uriSegment:any) => {this.completeURI += uriSegment.path+"/"})
		this.getTheUriData()
		this.getIBESTATDatasets('IBESTAT', '' , '')
		/* this.actualProjectName = this.route.snapshot.paramMap.get('projectName')
		this.actualProjectID = this.route.snapshot.paramMap.get('contentID') */
    switch (localStorage.getItem('preferredLang')) {
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

		this.getHomeSlides()

		if (this.actualProjectName) {
			this.getOneContent(this.actualProjectID)
		}
	}

	getTheUriData () {
    this.getTheUri.getAll()
      .subscribe( (resp: any) => {
      this.uriProjectData = resp.filter((uriToFilter: UriProjectConversionDTO) => uriToFilter.uri === this.completeURI)
			if (this.uriProjectData[0] ) {
      	this.actualProjectName = this.uriProjectData[0]['data'][0]
      	this.actualProjectID = this.uriProjectData[0]['data'][1]
			}
			if (this.actualProjectName) {
				this.getOneContent(this.actualProjectID)
			}
      }) 
  }
	
	getIBESTATDatasets (agencyID: string, resourceID: string, version: string) {
		this.ibestatService.getDatastets(agencyID, resourceID, version)
		.subscribe ( (resp: any) => {
			this.ibestatDataSets = resp
			console.log ("Desde slider Component: ", this.ibestatDataSets)
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

	getHomeSlides() {
		this.slideHomeService.getAll()
			.subscribe( (slides: any) => {
				this.slides = slides
				if (this.actualProjectName) {
					this.slides = this.slides.filter((slide:SliderHomeDTO) => slide.projectNameCA === this.actualProjectName)
				}
			})
	}

	getOneContent (id:string | null) {
    this.getNoticia.get(id)
      .subscribe( (resp: any) => {
        this.oneContentAttributes = resp.data.attributes
      }) 
  }

}
