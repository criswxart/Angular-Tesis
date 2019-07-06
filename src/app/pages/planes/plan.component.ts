import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, PlanService } from '../../services/service.index';
import { Plan } from '../../models/plan.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styles: []
})
export class PlanComponent implements OnInit {

  usuarios: Usuario[] = [];
  /* plan: Plan = new Plan('', '', '', '', '','','',''); */
  
  constructor(
    public _usuarioService: UsuarioService,
    public _planService: PlanService
  ) { }

  ngOnInit() {
    
    this._usuarioService.cargarUsuarios()
        .subscribe( usuarios => this.usuarios = usuarios );

  }

  guardarPlan( f:NgForm ){
    console.log( f.valid );
    console.log( f.value );
    if(f.invalid){
      return;

    }

    this._planService.guardarPlan( this.plan )
        .subscribe( plan => {
          console.log(plan);
        })

  }
  
}
