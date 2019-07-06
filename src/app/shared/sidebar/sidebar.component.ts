import { Component, OnInit } from '@angular/core';

import { SidebarService, ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  profesional: Profesional;

  constructor(
    public _sidebar: SidebarService,
    public _profesionalService: ProfesionalService
  ) { }

  ngOnInit() {
    this.profesional = this._profesionalService.profesional;
    this._sidebar.cargarMenu();
  }

}
