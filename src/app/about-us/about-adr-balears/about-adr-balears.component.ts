import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { Category, reqCategory } from '../../Models/category.dto'
import { OneCategory } from '../../Models/oneCategory.dto'
import { ContentService } from '../../services/content.service'
import { CategoryService } from '../../services/category.service'

@Component({
  selector: 'app-about-adr-balears',
  templateUrl: './about-adr-balears.component.html',
  styleUrl: './about-adr-balears.component.scss'
})
export class AboutAdrBalearsComponent {
  public rootCategory: string = '367' /* id de la categoría raíz 'idi-qui-som', el punto de entrada */
  public rootCategoryDetails: OneCategory | undefined
  public childCatMatrixHomeIDI: string[] = [] /* ID de Categorías hijas de 'idi-qui-som' */
  public currentLang: string = ""
  public categorias: reqCategory[] | undefined

  constructor( 
    public translateService: TranslateService, 
    private categoryService: CategoryService, 
    private articleService: ContentService, 
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {

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
    
    this.getCategoryDetail( this.rootCategory )
    this.getChildCategories( this.rootCategory ) /* Get child categories from 'idi-qui-som' */
    
  }

  getChildCategories( parentCategory: string ) {

    this.categoryService.getCategories()
      .subscribe( ( categorias:Category ) => {

          this.categorias = categorias.data
          this.categorias = this.categorias.filter( ( item : reqCategory ) => { item.attributes.published === 1 } )

          categorias.data.map( item => {

          if ( item.attributes.parent_id.toString() === `${parentCategory}` ) {
            this.childCatMatrixHomeIDI.push(`${item.attributes.id.toString()}#${item.attributes.title}#${item.attributes.note}`) /* Si es cat el nombre esta en 'title', si es esp el nombre está en 'note' */
          }
         
          })

      })
     
  }

  getCategoryDetail( catID: string ) {
    this.categoryService.getCategory(catID)
      .subscribe( (category:OneCategory) => {
        this.rootCategoryDetails = category /* de aquí obtendré la imagen de cabecera de la página 'Qui som' */
      })
  }
}
