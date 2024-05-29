import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { attrArticle, reqArticle } from '../../Models/article-data.dto';
import { ArticleContentService } from '../../services/article-content.service';
import { CategoryService } from '../../services/category.service';
import { Category, reqCategory } from '../../Models/category.dto';

@Component({
  selector: 'app-about-adr-balears-child',
  templateUrl: './about-adr-balears-child.component.html',
  styleUrl: './about-adr-balears-child.component.scss'
})

export class AboutAdrBalearsChildComponent {

  @Input() childCategory:string = ""; // decorate the property with @Input() with the 'adr-qui-som' child categories

  public childChildCategory: reqCategory[] | undefined
  public childChildCatMatrixHomeIDI: string[] = [] /* ID de Categorías nietas de ''idi-qui-som' */

  public articulos: reqArticle[] = [] /* Contenidos  */ 
  public categorias: reqCategory[] | undefined

  public ArticulosAttributes: attrArticle | undefined
  public currentLang: string | undefined

  constructor( 
    public translateService: TranslateService, 
    private categoryService: CategoryService, 
    private articleService: ArticleContentService, 
  ) { }

    ngOnInit(): void {
      /* console.log ("*"+this.childCategory+"*") */
      console.log (`-${this.translateService.currentLang} - ${localStorage.getItem('preferredLang')}-`)
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
      
      this.getArticulos( this.currentLang, this.childCategory )
    }

    getChildChildCategories ( parentCategory: string ) {
      this.categoryService.getCategories() 
        .subscribe( ( item:Category ) => {
          this.childChildCategory = item.data
          this.childChildCategory = this.childChildCategory.filter( ( item : reqCategory ) => item.attributes.published === 1 )
          this.childChildCategory.map ( item => {
           /*  console.log ( `Parent: ${item.attributes.parent_id.toString()}`, `Parent: ${parentCategory}` ) */
            if ( item.attributes.parent_id.toString() === `${parentCategory}`) {
              this.childChildCatMatrixHomeIDI.push(item.attributes.id.toString())
            }
          })
        } )
    }

    getArticulos( currentLanguage:string, childChildCategories: string /* ids de categorías child child */ ) {
     /*  console.log (".."+childChildCategories+"..") */
      this.articleService.getAll() /* Para cada categoría nieta, buscar todos los artículos asociados */
          .subscribe( (resp:any) => {
            this.articulos = resp.data
           /*  console.log ("--"+this.articulos+"--") */
            this.articulos = this.articulos.filter( (item : reqArticle) => item.attributes.state === 1) /* Todos los artículos publicados */
            this.articulos = this.articulos.filter( (item : reqArticle) => item.attributes.language === `${currentLanguage}`) /* Todos los artículos en el idioma de la web */
            this.articulos = this.articulos.filter( (item : reqArticle) => childChildCategories.includes( item.relationships.category.data.id ) ) /* Todos los artículos cuya categoría está en el array */
            this.articulos = this.articulos.sort((a,b) => {return +a.attributes.title - +b.attributes.title} ) /* Todos los artículos ordenados*/
          } ) 
  
    }


}
