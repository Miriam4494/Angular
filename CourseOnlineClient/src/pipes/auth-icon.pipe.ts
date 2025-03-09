

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authIcon'
})
export class AuthIconPipe implements PipeTransform {
  transform(action: string): string {
    switch (action) {
      case 'login':
        return 'login'; 
      case 'register':
        return 'person_add'; 
      case 'logout':
        return 'open_in_new'; 
      default:
        return 'help'; 
    }
  }
}
