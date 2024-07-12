import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wellFormattedLink'
})
export class WellFormattedLinkPipe implements PipeTransform {

  transform(theLink: string, ...args: unknown[]): string {
    
    let regex = /\dd/g

    theLink=theLink.replaceAll('index.php?option=com_content&amp;view=article&amp;id=',"direct-link/")
    theLink=theLink.replaceAll('&amp;catid=','/')
    theLink=theLink.replaceAll(regex, '*')
    theLink=theLink.replaceAll('&amp;lang=','')
    theLink=theLink.replaceAll('es-ES','')
    theLink=theLink.replaceAll('ca-ES','')
 
    return theLink
  }

}
