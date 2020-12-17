import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // Ruta base = http://localhost:8080/api/clientes/

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private urlCliente: string = `${environment.urlBaseClientes}/`

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlCliente).pipe(
      map((response: any) => response.clientes as Cliente[]),
        catchError(e => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          return throwError(e);
        })
    )
  }
}
