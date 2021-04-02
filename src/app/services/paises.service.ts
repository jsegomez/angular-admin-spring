import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Pais, ResponsePais } from '../models/Pais.interface';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private urlPaises = 'http://localhost:8080/api/paises/lista';

  // Manejo de errores
  private noAutorizado(e: any){
    if(e.status == 401 || e.status == 403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }


  getPaises(): Observable<Pais[]>{
    return this.http.get<ResponsePais>(this.urlPaises).pipe(
      map((response: ResponsePais) => {
          let paises = response.paises as Pais[];
          return paises;
      }),
      catchError( e => {
        // Función para validar que este logeado o con permisos para acción
        if(this.noAutorizado(e)){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }
}







