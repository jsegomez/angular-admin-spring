import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TokenInterface } from '../../models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  private urlLogin: string = 'http://localhost:8080/oauth/token';
  private credencialesApp: string = btoa('angularApp' + ':' + '123456');
  private params = new URLSearchParams();
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + this.credencialesApp
  });

  // Método para inicio de sesión
  login(usuario: Usuario): Observable<TokenInterface>{
    this.params.set('grant_type', 'password');
    this.params.set('username', usuario.username);
    this.params.set('password', usuario.password);

    return this.http.post<any>(this.urlLogin, this.params.toString(), {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario y/o contraseña incorrectas!',
            timer: 3000
          });
        }
        return throwError(e);
      })
    )

  }

}
