import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'categoryID'
})
export class CategoryIdPipe implements PipeTransform {
  
  mustShowAsLink: any;
  
  
  transform( currentCategory: string, ...args: unknown[] ): any {

    let splitted = currentCategory.split("#");

    return splitted[0];
  
}

}