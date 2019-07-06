import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { ProfesionalService } from '../profesional/profesional.service';
import Swal from 'sweetalert2';
import { Plan } from '../../models/plan.model';

@Injectable()
export class PlanService {

  totalPlanes: number = 0;

  constructor(
    public http: HttpClient,
    public _profesionalService: ProfesionalService
  ) { }

  cargarPlanes(){
    let url = URL_SERVICIOS +'/plan';

    return this.http.get(url)
    .map((resp:any) =>{
      this.totalPlanes = resp.total;
      return resp.planes;
    })
  }

  borrarPlan(id: string){

    let url = URL_SERVICIOS +'/plan/' + id;
    url += '?token=' +this._profesionalService.token;

    return this.http.delete( url )
          .map( resp =>{  
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'El Plan ha sido eliminado',
              showConfirmButton: false,
              timer: 1500
            })
            return resp;
        })          
  }

  //para crear y actualizar

  guardarPlan( plan: Plan ){
      
    let url = URL_SERVICIOS+ '/plan';
    url += '?token=' + this._profesionalService.token;

    return this.http.post(url, plan)
    .map( (resp:any) =>{
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'El Plan ha sido creado con exito!',
          showConfirmButton: false,
          timer: 1500
        });
        return resp.planes;
    })
  }

}
