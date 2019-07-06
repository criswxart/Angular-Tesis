import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  profesional: Profesional;

  constructor(
    public _profesionalService: ProfesionalService,
    public router: Router
  ) { }

  ngOnInit() {
    this.profesional = this._profesionalService.profesional;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

}
