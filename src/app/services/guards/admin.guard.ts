import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProfesionalService } from '../profesional/profesional.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public _profesionalService: ProfesionalService
  ) { }

  canActivate() {

    if ( this._profesionalService.profesional.role === 'ADMIN_ROLE' ) {
      return true;
    }else {
      console.log( 'Bloqueado por el ADMIN GUARD');
      this._profesionalService.logout();
      return false;
    }

  }

}
