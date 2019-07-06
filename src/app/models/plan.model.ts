export class Plan {

    constructor(
        public tipoPlan:string,
        public objetivos:string,
        public fechaInicio:Date,
        public fechaFin:Date,
        public observaciones:string,
        public estado:string,
        public usuario?:string,
        public profesional?:string,
        public _id?:string
    ){}
}