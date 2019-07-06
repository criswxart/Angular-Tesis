
export class Usuario {

    constructor(
        public nombre: string,
        public apellidos: string,
        public direccion: string,
        public telefono: string,
        public fechaNac: Date,
        public fechaIngreso: Date,
        public sexo: string,
        public _id?: string
    ) { }

}


