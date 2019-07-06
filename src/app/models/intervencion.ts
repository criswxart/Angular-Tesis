export class Intervencion {

    constructor(
        public objetivoSesion:string,
        public descripcion:string,
        public fecha:string,
        public tipo?:string,
        public profesional?:string,
        public _id?:string
    ){}
}