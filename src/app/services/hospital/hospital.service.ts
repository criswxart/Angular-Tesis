import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { ProfesionalService } from '../profesional/profesional.service';
import { Hospital } from '../../models/hospital.model';

import swal from 'sweetalert';

@Injectable()
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _profesionalService: ProfesionalService
  ) { }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalHospitales = resp.total;
                return resp.hospitales;
              });

  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.hospital );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._profesionalService.token;

    return this.http.delete( url )
                .map( resp => swal('Hospital Borrado', 'Eliminado correctamente', 'success') );

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._profesionalService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.hospital );

  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.hospitales );

  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._profesionalService.token;

    return this.http.put( url, hospital )
              .map( (resp: any) => {

                swal('Hospital Actualiado', hospital.nombre, 'success');
                return resp.hospital;
              });

  }

}
