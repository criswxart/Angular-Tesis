import { Component, OnInit } from '@angular/core';
import { Tipo } from '../../models/tipointervencion.model';
import { TipointerService } from '../../services/service.index';

declare var swal: any;
@Component({
  selector: 'app-tipointer',
  templateUrl: './tipointer.component.html',
  styles: []
})
export class TipointerComponent implements OnInit {

  tipos: Tipo[] = [];

  constructor(
    public _tipoInter: TipointerService,
  ) { }

  ngOnInit() {
    this.cargarTipo();
  }

  /* buscarTipo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarTipo();
      return;
    }
    this._tipoInter.buscarTipo( termino )
            .subscribe( this.tipos => this.tipos = tipos );

  } */

  cargarTipo() {
    this._tipoInter.cargarTipos()
            .subscribe( tipos => this.tipos = tipos );
  }


  guardarTipo( tipo: Tipo) {

    this._tipoInter.actualizarTipo( tipo )
            .subscribe();

  }

  borrarTipo( tipo: Tipo ) {

    this._tipoInter.borrarTipo( tipo._id )
            .subscribe( () =>  this.cargarTipo() );

  }

 crearTipo() {

    swal({
      title: 'Crear Tipo',
      text: 'Ingrese el nombre del Tipo de intervención',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (text: string ) => {

      if ( !text || text === null ) {
        return;
      }
      console.log(text);
      this._tipoInter.crearTipo( text )
              .subscribe( () => this.cargarTipo() );

    });

  }


}
