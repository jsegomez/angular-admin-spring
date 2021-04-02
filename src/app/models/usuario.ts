export class Usuario {
  constructor(
    public id?: number,
    public username: string = '',
    public password: string = '',
    public nombre?: string,
    public apellido?: string,
    public roles?: string[]
  ){}
}
