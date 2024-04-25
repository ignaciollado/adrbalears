import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { reqArticle } from '../../model/article-data.model';
import { SearchTheWebService } from '../../services/search-the-web.service';

@Component({
  selector: 'app-search-the-web-result-list',
  templateUrl: './search-the-web-result-list.component.html',
  styleUrl: './search-the-web-result-list.component.scss'
})
export class SearchTheWebResultListComponent {

  currentLang: string | undefined;
  public contenidos: reqArticle[] | undefined
  public searchTerm: string | null = ""

  constructor( private route: ActivatedRoute,
    private router: Router, public translateService: TranslateService,
    public searchService: SearchTheWebService ) { }

  ngOnInit(): void {
   this.searchTerm = this.route.snapshot.paramMap.get('searchTerm')

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

   this.searchService.getArticles()
      .subscribe( (result: any) => {
        this.contenidos = result.data
        this.contenidos = result.data.filter( (item : reqArticle) => item.attributes.language === `${this.currentLang}`) 
        this.contenidos = this.contenidos!.filter( item => item.attributes.text.toUpperCase().includes(this.searchTerm!.trim().toUpperCase()) )
        console.log(this.contenidos, this.searchTerm)
      }, (err) => {
        console.log( err.msg );
      })

  }
}
