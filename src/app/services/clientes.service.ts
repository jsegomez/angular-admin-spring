import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ClienteClass } from '../models/cliente';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // http://localhost:8080/api/clientes

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlCliente: string = `${environment.urlBaseClientes}`
  private urlImagenes: string = 'http://localhost:8080/api/image';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // ======================================== Servicios ============================================

  // Manejo de errores en caso no este logeado
  private noAutorizado(e: any){
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  private privilegiosInsuficientes(e: any){
    if(e.status == 403){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No tiene permisos para esta acción!',
      })
      return throwError(e);
    }
    return false;
  }

  // Obtener listado de clientes sin paginar
  getClientes(): Observable<ClienteClass[]> {
    return this.http.get<ClienteClass[]>(this.urlCliente).pipe(
      map((response: any) => response.clientes as ClienteClass[]),
      catchError(e => {

        // Función para validar que este logeado o con permisos para acción
        if(this.noAutorizado(e)){
          return throwError(e);
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar clientes!'
        })
        return throwError(e);
      })
    )
  }

  // Obtener clientes paginados
  getClientesPaginados(pagina: string): Observable<any>{
    return this.http.get(`${this.urlCliente}/pagina/${pagina}`).pipe(
      map((response: any) => response.clientes),
      catchError(e => {

        // Función para validar que este logeado o con permisos para acción
        if(this.noAutorizado(e)){
          return throwError(e);
        }

        // Errores generales
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al cargar clientes!'
        })
        return throwError(e);
      })
    );
  }

  // Obtener cliente por id
  getClienteById(id: number): Observable<ClienteClass> {
    return this.http.get<ClienteClass>(`${this.urlCliente}/${id}`).pipe(
      map((response: any) => response.cliente as ClienteClass),
      catchError(e => {
        // Función para validar que este logeado o con permisos para acción
        if(this.noAutorizado(e)){
          return throwError(e);
        }

        if(e.status == 404){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Cliente con id: ${id} no existe en la base de datos`,
          });
          return throwError(e);
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al obtener cliente!',
        });
        return throwError(e);
      })
    )
  }

  // Método para crear cliente
  createCliente(cliente: ClienteClass): Observable<ClienteClass> {
    return this.http.post<ClienteClass>(`${this.urlCliente}/`, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as ClienteClass),
      catchError(e => {
        // Función para validar que este logeado o con permisos para acción
        this.privilegiosInsuficientes(e);

        // Válida si correo electrónico está registrado.
        if(e.status == 406){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo ya está registrado!',
          })
          return throwError(e);
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al registrar cliente!',
        })
        return throwError(e);
      })
    )
  }

  // Método para actualizar un cliente
  updateCliente(cliente: ClienteClass): Observable<ClienteClass> {
    return this.http.put<ClienteClass>(`${this.urlCliente}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as ClienteClass),
      catchError(e => {
        this.privilegiosInsuficientes(e);

        // Error al encontrar email duplicado
        if(e.status == 406){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Correo ya está registrado!',
          })
          return throwError(e);
        }


        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al actualizar cliente!',
        })
        return throwError(e);
      })
    );
  }

  // Método para eliminar cliente
  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.urlCliente}/${id}`).pipe(
      catchError(e => {
        this.privilegiosInsuficientes(e);

        // Función para validar que este logeado o con permisos para acción
        if(this.noAutorizado(e)){
          return throwError(e);
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al eliminar cliente!',
        })
        return throwError(e);
      })
    );
  }

  // Método para cargar una imagen
  cargarImagen(archivo: File, id: string): Observable<HttpEvent<{}>>{
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${this.urlImagenes}/upload`, formData, {reportProgress: true});

    return this.http.request(req);
  }
}
