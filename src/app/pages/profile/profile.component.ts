import { Component, OnInit } from '@angular/core';
import { Profesional } from '../../models/profesional.model';
import { ProfesionalService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  profesional: Profesional;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _profesionalService: ProfesionalService
  ) {
    this.profesional = this._profesionalService.profesional;
  }

  ngOnInit() {
  }

  guardar( profesional: Profesional ) {

    this.profesional.nombre = profesional.nombre;
    this.profesional.apellidos = profesional.apellidos;
    this.profesional.telefono = profesional.telefono;
    this.profesional.especialidad = profesional.especialidad;
    this.profesional.email = profesional.email;


    this._profesionalService.actualizarProfesional( this.profesional )
                .subscribe();

  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._profesionalService.cambiarImagen( this.imagenSubir, this.profesional._id );

  }

}
