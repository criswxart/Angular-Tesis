import { Component, OnInit } from '@angular/core';
import { Plan } from '../../models/plan.model';
import { PlanService } from '../../services/service.index';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: []
})

export class PlanesComponent implements OnInit {

  planes: Plan [] = [];

  constructor(
    public _planService:PlanService
  ) { }

  ngOnInit() {
    this.cargarPlanes();
  }

  cargarPlanes(){
    this._planService.cargarPlanes()
        .subscribe(planes => this.planes = planes)
  }

  borrarPlan( plan: Plan ){
    this._planService.borrarPlan(plan._id)
        .subscribe( () => this.cargarPlanes());
  }



}
