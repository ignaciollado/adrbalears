import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { WPpageService } from '../services/wp-page.service';
import { WpPage } from '../Models/wp-page-data.dto';
import { WpPageFeaturedMedia } from '../Models/wp-page-featured-media.dto';


@Component({
  selector: 'app-show-legal-info',
  templateUrl: './show-legal-info.component.html',
  styleUrl: './show-legal-info.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShowLegalInfoComponent {
  public id:number | null = +this.route.snapshot.paramMap.get('id')
  public currentLang: string | undefined
  public currentWPLang: number
  public legalContent: WpPage
  public contenidoMedia: WpPageFeaturedMedia

  constructor( public translateService: TranslateService, 
    private wpPageService: WPpageService, 
    private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      switch (localStorage.getItem('preferredLang')) {
        case 'es-ES':
          this.currentWPLang = 24
        break
        case 'ca-ES':
          this.currentWPLang = 25
        break
        case 'en-EN':
          this.currentWPLang = 26
        break
        default:
          this.currentWPLang = 26
      }
      this.getLegalContent(this.id)
      window.scroll(0,0)
    }

    getLegalContent (id: number) {
      this.wpPageService.getLegalContent(id)
          .subscribe(
            (wpPage: WpPage) => { 
              console.log ("the legal content: ", wpPage)
              this.legalContent = wpPage })
    }

}
