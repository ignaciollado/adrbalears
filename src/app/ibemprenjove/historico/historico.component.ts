import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IbemprenjoveService } from '../../services/ibemprenjove.service';
import { CooperativaDTO } from '../../Models/cooperativa.dto';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HistoricoComponent {
  public program_id: string | null = this.route.snapshot.paramMap.get('id')
  public currentLang: string | undefined;
  public cooperativaList: CooperativaDTO[] = []
  public cooperativaListTemp: CooperativaDTO[] = []
  public isProgramaIbemprenJove: boolean = false
  public isJES: boolean = false
  public isJEA: boolean = false
  public isJEP: boolean = false
  public cooperativaProgram: string = ""

  constructor( public translateService: TranslateService, 
    private cooperativaService: IbemprenjoveService,
    private route: ActivatedRoute,
    private router: Router ) { }

    ngOnInit(): void {
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
      if (this.program_id === '2') {
          this.isJES = true
          this.cooperativaProgram = "JES"
        }
      if (this.program_id === '3') {
          this.isJEA = true
          this.cooperativaProgram = "JEA"
        }
      if (this.program_id === '1') {
          this.isJEP = true
          this.cooperativaProgram = "JEP"          
        }
      this.getCooperativas ( +this.program_id, [4, 3, 2, 1])
   
      window.scroll(0,0)
    }

    getCooperativas(program: number, year: number[]) {

      this.cooperativaService.getAll(program, year[0])
        .subscribe((cooperativa:any[]) => {
        this.cooperativaListTemp = cooperativa
        this.cooperativaList = cooperativa['data'].map((item:any) => item)
      })

    }
}
