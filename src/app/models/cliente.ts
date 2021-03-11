import { Pais } from "./Pais.interface";

export interface Cliente {
  cliente: ClienteClass;
  mensaje: string;
}

export interface ClienteClass {
  id:       number;
  nombre:   string;
  apellido: string;
  email:    string;
  createAt: Date;
  pais?:    Pais | null;
  imagen?:  null | string;
}
