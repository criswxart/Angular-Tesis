import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string){
    if ( termino.length <=0){
      this.cargarUsuarios();
      return;
    }
    this._usuarioService.buscarUsuario(termino)
      .subscribe( usuarios => this.usuarios = usuarios )
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios()
            .subscribe( usuarios => this.usuarios = usuarios );
  }
  guardarUsuario(usuario: Usuario){

   /*  this._usuarioService.actualizarProfesional(usuario)
    .subscribe();  */
  }

  borrarUsuario(usuario: Usuario){
    this._usuarioService.borrarUsuario( usuario._id )
      .subscribe( () => this.cargarUsuarios() );
  }

}
