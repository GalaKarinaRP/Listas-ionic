import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'fitroCompletado',
  pure: false
})
export class FitroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {

    return listas.filter( lista => lista.completada === completada);
    
  }

}
