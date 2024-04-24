import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'highlightSearchTerm'
})
export class HighlightSearchTermPipe implements PipeTransform {
  

 /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */

  transform(items:string, searchText: string): SafeStyle {

    if (!items) {
      return
    }
    if (!searchText) {
      return items
    }
    
    items = items.replaceAll(searchText, `<mark>${ searchText}</mark>`)
    return items
   
    /* return byPassSecurityTrustStyle(items) */
  
  }

}
