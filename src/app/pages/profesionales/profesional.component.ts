import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfesionalService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Profesional } from '../../models/profesional.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styles: []
})
export class ProfesionalComponent implements OnInit {


  formulario:FormGroup;

  constructor( public _profesionalService: ProfesionalService,
               public router: Router 
                ) { }


  ngOnInit() {
    this.formulario = new FormGroup({
      nombre: new FormControl( null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      especialidad: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null,Validators.required),

    },{ validators: this.sonIguales( 'password', 'password2' )});
  }

  registrarProfesional(){

    console.log(this.formulario.value);

    let profesional = new Profesional(
      this.formulario.value.nombre,
      this.formulario.value.apellidos,
      this.formulario.value.especialidad,
      this.formulario.value.telefono,
      this.formulario.value.email,
      this.formulario.value.password
    );
    this._profesionalService.crearProfesional(profesional)
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
            this.router.navigate(['./profesionales/crear']);
          } else if (
            this.router.navigate(['./profesionales'])
          ) {
            swalWithBootstrapButtons.fire(
              'Listar profesionales'
            )
          }
        })
      });
  }

  //Comparación de contraseñas
  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };

    };

  }

}
