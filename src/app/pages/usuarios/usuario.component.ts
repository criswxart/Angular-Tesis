import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  
  formulario:FormGroup;

  constructor( public _usuarioService: UsuarioService,
               public router: Router 
                ) { }


  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl( null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      fechaNac: new FormControl(null, [Validators.required, Validators.email]),
      fechaIngreso: new FormControl(null, Validators.required),
      sexo: new FormControl(null,Validators.required),

    });
  }

  registrarUsuario(){

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.apellidos,
      this.formulario.value.direccion,
      this.formulario.value.telefono,
      this.formulario.value.fechaNac,
      this.formulario.value.fechaIngreso,
      this.formulario.value.sexo
    );
    this._usuarioService.crearUsuario(usuario)
      .subscribe( result => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-warning'
          },
          buttonsStyling: false,
        })
        swalWithBootstrapButtons.fire({
          title: 'Profesional agregado correctamente',
          type: 'success',
          text: "Desea agregar a otro profesional?",
          showCancelButton: true,
          confirmButtonText: 'Si!',
          cancelButtonText: 'No, listar!',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['./usuarios/crear']);
          } else if (
            this.router.navigate(['./usuarios'])
          ) {
            swalWithBootstrapButtons.fire(
              'Listar Usuarios'
            )
          }
        })
      });
  }


}
