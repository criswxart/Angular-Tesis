import { Injectable } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import swal from 'sweetalert';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class ProfesionalService {

  profesional: Profesional;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }


  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
                .map( (resp: any) => {

                  this.token = resp.token;
                  localStorage.setItem('token', this.token );
                  console.log('Token renovado');

                  return true;
                })
                .catch( err => {
                  this.router.navigate(['/login']);
                  swal( 'No se pudo renovar token', 'No fue posible renovar token', 'error' );
                  return Observable.throw( err );
                });


  }


  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.profesional = JSON.parse( localStorage.getItem('profesional') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.profesional = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, profesional: Profesional, menu: any ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('profesional', JSON.stringify(profesional) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.profesional = profesional;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.profesional = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('profesional');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                  return true;
                });


  }

  login( profesional: Profesional, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', profesional.email );
    }else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, profesional )
                .map( (resp: any) => {
                  this.guardarStorage( resp.id, resp.token, resp.profesional, resp.menu );
                  return true;
                })
                .catch( err => {

                  swal( 'Error en el login', err.error.mensaje, 'error' );
                  return Observable.throw( err );
                });

  }


  crearProfesional( profesional: Profesional ) {

    let url = URL_SERVICIOS + '/profesional';

    return this.http.post( url, profesional )
              .map( (resp: any) => {

                swal('Profeisonal creado', profesional.email, 'success' );
                return resp.profesional;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
  }

  actualizarProfesional( profesional: Profesional ) {

    let url = URL_SERVICIOS + '/profesional/' + profesional._id;
    url += '?token=' + this.token;

    return this.http.put( url, profesional )
                .map( (resp: any) => {

                  if ( profesional._id === this.profesional._id ) {
                    let profesionalDB: Profesional = resp.profesional;
                    this.guardarStorage( profesionalDB._id, this.token, profesionalDB, this.menu );
                  }

                  swal('Profesional actualizado', profesional.nombre, 'success' );

                  return true;
                })
                .catch( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return Observable.throw( err );
                });

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'profesionales', id )
          .then( (resp: any) => {

            this.profesional.img = resp.profesional.img;
            swal( 'Imagen Actualizada', this.profesional.nombre, 'success' );
            this.guardarStorage( id, this.token, this.profesional, this.menu );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarProfesionales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/profesional?desde=' + desde;
    return this.http.get( url );

  }

  /* buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  } */

  borrarProfesional( id: string ) {

    let url = URL_SERVICIOS + '/profesional/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Profesional borrado', 'El Profesional a sido eliminado correctamente', 'success');
                  return true;
                });

  }

}
