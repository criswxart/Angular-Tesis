import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ProfesionalService } from '../profesional/profesional.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _profesionalService: ProfesionalService,
    public router: Router
  ) {}

  canActivate() {

    if ( this._profesionalService.estaLogueado() ) {
      return true;
    } else {
      console.log( 'Bloqueado por guard' );
      this.router.navigate(['/login']);
      return false;
    }

  }
}
