import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highLightSearch' })
export class HighLightSearchPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform( items: any, searchText: string): any[] {

    if (!searchText) {
      return [];
    }
    if (!searchText) {
      return items;
    }
   return items.replaceAll(searchText, `<span class='highlight'>${searchText}</span>`);
  }

}
