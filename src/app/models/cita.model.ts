export class Cita {

    constructor(
        public estado:string,
        public fecha:string,
        public hora:Date,
        public fechaFin:Date,
        public profesional?:string,
        public _id?:string
    ){}
}