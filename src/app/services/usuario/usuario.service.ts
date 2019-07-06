import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { ProfesionalService } from '../profesional/profesional.service';
import Swal from 'sweetalert2'
import { Usuario } from '../../models/usuario.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  totalUsuarios: number = 0;

  constructor(
    public http: HttpClient,
    public _profesionalService: ProfesionalService
  ) { }

  cargarUsuarios(){
    let url = URL_SERVICIOS +'/usuario';
    return this.http.get(url)
      .map( (resp:any) =>  {
        this.totalUsuarios = resp.total;
        return resp.usuarios;
      });  
  }

  obtenerUsuarios( id:string ){
    let url = URL_SERVICIOS +'/usuario/' +id;
    return this.http.get( url )
      .map(( resp:any ) => resp.usuario);
  }

  borrarUsuario( id:string ){
    let url = URL_SERVICIOS +'/usuario/' + id;
    url += '?token=' + this._profesionalService.token;
    return this.http.delete(url)
    .map( resp =>{
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Usuario eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    } )
  }

 
  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';
    url += '?token=' +this._profesionalService.token;

    return this.http.post( url, usuario )
              .map( (resp: any) => {
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Usuario creado correctamente',
                  showConfirmButton: false,
                  timer: 1500
                })
                
                return resp.usuario;
              })
              .catch( err => {
                Swal.fire
                ( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });
  }

  buscarUsuario(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );
  }

  actualizarProfesional( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this._profesionalService.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  Swal.fire('Usuario actualizado','success' );

                  return resp.usuario;
                })
                .catch( err => {
                  Swal.fire( err.error.mensaje, err.error.errors.message, 'error' );
                  return Observable.throw( err );
                });

  }



}
