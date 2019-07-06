import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { ProfesionalService } from '../profesional/profesional.service';
import { Tipo } from '../../models/tipointervencion.model';
import Swal from 'sweetalert2';

@Injectable()
export class TipointerService {

  totalTipos: number = 0;
  tipos: Tipo;

  constructor(
    public http: HttpClient,
    public _profesionalService: ProfesionalService
  ) { }

  cargarTipos() {

    let url = URL_SERVICIOS + '/tipo';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalTipos = resp.total;
                return resp.tipointer;
              });

  }

  obtenerTipos( id: string ) {

    let url = URL_SERVICIOS + '/tipo/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.tipointer );

  }

  borrarTipo( id: string ) {

    let url = URL_SERVICIOS + '/tipo/' + id;
    url += '?token=' + this._profesionalService.token;

    return this.http.delete( url )
                .map( resp => 
                Swal.fire('Tipo de intervención Borrado', 
                'Eliminado correctamente', 
                'success') );

  }

  crearTipo( nombre: string ) {

    let url = URL_SERVICIOS + '/tipo';
    url += '?token=' + this._profesionalService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.tipointer );

  }

  buscarTipo( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tipo/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.tipointer );

  }

  actualizarTipo( tipo: Tipo ) {

    let url = URL_SERVICIOS + '/tipo/' + tipo._id;
    url += '?token=' + this._profesionalService.token;

    return this.http.put( url, tipo )
              .map( (resp: any) => {
                Swal.fire
                ('Hospital Actualiado', 
                tipo.nombre, 
                'success');
                return resp.tipointer;
              });
  }

}
