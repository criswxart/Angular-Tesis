export class Profesional {

    constructor(
        public nombre:string,
        public apellidos:string,
        public especialidad:string,
        public telefono:string,
        public email:string,
        public password:string,
        public img?:string,
        public role?: string,
        public _id?:string
    ){}
}