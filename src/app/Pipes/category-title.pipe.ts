import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'categoryTitle'
})

export class CategoryTitlePipe implements PipeTransform {


  transform(currentCategory: string, args: string): string {

    let splitted = currentCategory.split("#");

    if (args === 'es-ES') {
      return splitted[2];
    } else {
      return splitted[1];
    }

    

  }

}
