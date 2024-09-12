import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
/* import { FormBuilder, FormGroup, Validators } from '@angular/forms'; */
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ArticleContentService } from '../services/article-content.service';
import { genericDataDTO } from '../Models/generic-data.dto';
import { reqArticle } from '../Models/article-data.dto';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
	logo: string;
	fase: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})

export class BodyComponent {
	tiles: Tile[] = [
    {text: 'Tengo un proyecto,<br>quiero convertirlo en una realidad', cols: 2, rows: 3, color: '#6b9da7', logo: 'logo-adrbalears-emprender.webp', fase: '#emprendre'},
    {text: 'Quiero aprender a emprender', cols: 3, rows: 3, color: '#6b9da7', logo: 'logo-adrbalears-emprender.webp', fase: '#emprendre'},
		{text: '¿Qué puedo hacer para mejorar las capacidades de mis<br>trabajadores y de los gestores?', cols: 2, rows: 4, color: '#6b9da7', logo: 'logo-adrbalears-emprender.webp', fase: '#connectar'},

		{text: 'Me interesa la sostenibilidad<br>de mi actividad', cols: 2, rows: 3, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},
		{text: '¿Comó puedo reutilizar mis productos obsoletos?', cols: 2, rows: 3, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},
    {text: '¿Cómo podría digitalizar<br>mi empresa, negocio, actividad?', cols: 2, rows: 3, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#emprendre'},
    {text: 'Me gustaría ceder mi empresa, negocio, actividad', cols: 2, rows: 4, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},

		{text: 'Estoy buscando<br>un empresa, negocio, actividad', cols: 3, rows: 3, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},
    {text: 'Quiero mejorar el interior de mi negocio', cols: 2, rows: 4, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},
    {text: 'Tengo una actividad industrial, necesito una ayuda, una subvención', cols: 2, rows: 3, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},
    {text: 'Tengo un comercio local', cols: 2, rows: 4, color: '#71b796', logo: 'logo-adrbalears-conectar.webp', fase: '#connectar'},

		{text: 'Invierte en Baleares,<br>establécete en una de las<br>regiones con más posibilidades', cols: 3, rows: 3, color: '#ed7448', logo: 'logo-adrbalears-proyectar.webp', fase: '#projectar'},
    {text: 'Tengo un producto, un servicio para exportar ¿cómo lo puedo hacer?', cols: 2, rows: 4, color: '#ed7448', logo: 'logo-adrbalears-proyectar.webp', fase: '#projectar'},
		{text: 'Mi empresa es industrial,<br>quiero internacionalizarme', cols: 2, rows: 3, color: '#ed7448', logo: 'logo-adrbalears-proyectar.webp', fase: '#projectar'},
  ];

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
	theLeftLema: string = "Nos gustaría ayudarte"
	theCenterLema: string = "<h1>Solicita asesoramiento</h1>"
	theRightLema: string = "Ponte en contacto con nosotros"
  situacionActual: UntypedFormControl
  interesadoEn: UntypedFormControl
  objetivoPrincipal: UntypedFormControl
  customizeTheWeb!: FormGroup
  profileExists: boolean = false
	
	private modalService = inject(NgbModal)
	@ViewChild('content') infoDialog = {} as TemplateRef<string>;

  constructor(config: NgbTooltipConfig,
		private contentService: ArticleContentService, private formBuilder: FormBuilder,
		public translateService: TranslateService) {
			// customize default values of tooltips used by this component tree
			config.placement = 'bottom';
			config.triggers = 'hover';

/* 			translate.addLangs(['cas', 'cat'])
    translate.setDefaultLang('cas')
    translate.use('cas') */

    this.situacionActual = new UntypedFormControl('', [ Validators.required ])
    this.interesadoEn = new UntypedFormControl('', [ Validators.required ])
    this.objetivoPrincipal = new UntypedFormControl('', [ Validators.required ])

    this.customizeTheWeb = this.formBuilder.group( {
      situacionActual: this.situacionActual,
      interesadoEn: this.interesadoEn,
      objetivoPrincipal: this.objetivoPrincipal
    });
		}

	ngOnInit() {
    switch (localStorage.getItem('preferredLang')) {
      case 'cat':
        this.currentLang = 'ca-ES'
 				this.theLeftLema  = "Ens agradaria ajudar-te"
				this.theCenterLema = "Sol·licita assessorament"
				this.theRightLema = "Posa't en contacte amb nosaltres"
      break
      case 'cas':
        this.currentLang = 'es-ES'  
				this.theLeftLema = "Nos gustaría ayudarte"
				this.theCenterLema = "Solicita asesoramiento"
				this.theRightLema = "Ponte en contacto con nosotros" 
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

	openHomePopUp(content: TemplateRef<any>) {
		this.modalService.open(content, { backdropClass: 'color-backdrop' });
	}

	onClick(customizeTheWeb: any) {
    if (customizeTheWeb.valid) {
      localStorage.setItem('situacionActual', customizeTheWeb.value.situacionActual)
      localStorage.setItem('interesadoEn', customizeTheWeb.value.interesadoEn)
      localStorage.setItem('objetivoPrincipal', customizeTheWeb.value.objetivoPrincipal)
      this.profileExists = true
    } else {
      console.error('profile form is in an invalid state: ', customizeTheWeb)
    } 
  }

}
