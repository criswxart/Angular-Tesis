import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class IntervencionService {

  totalIntervenciones: number = 0;
  constructor(
    public http: HttpClient
  ) { }

  cargarIntervenciones(){
    let url = URL_SERVICIOS+ '/tipo';

    return this.http.get(url)
            .map( (resp:any)=>  {
                return resp.intervenciones;
            })
  }
}
