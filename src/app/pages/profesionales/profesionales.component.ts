import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styles: []
})
export class ProfesionalesComponent implements OnInit {

  profesionales: Profesional[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _profesionalService: ProfesionalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarProfesionales();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarProfesionales() );
  }

  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarProfesionales() {

    this.cargando = true;

    this._profesionalService.cargarProfesionales( this.desde )
              .subscribe( (resp: any) => {

                this.totalRegistros = resp.total;
                this.profesionales = resp.profesionales;
                this.cargando = false;

              });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarProfesionales();

  }

 /*  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
            .subscribe( (usuarios: Usuario[]) => {

              this.usuarios = usuarios;
              this.cargando = false;
            });

  } */

  borrarProfesional( profesional: Profesional ) {

    if ( profesional._id === this._profesionalService.profesional._id ) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + profesional.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {

        this._profesionalService.borrarProfesional( profesional._id )
                  .subscribe( borrado => {
                      this.cargarProfesionales();
                  });

      }

    });

  }

 /*  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
            .subscribe();

  }
 */
}
