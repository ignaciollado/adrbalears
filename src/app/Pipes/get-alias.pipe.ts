import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getAlias'
})
export class GetAliasPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return value.split("#")[3];
  }

}
