import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais, ResponsePais } from '../models/Pais.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(
    private http: HttpClient,
  ) { }

  private urlPaises = 'http://localhost:8080/api/paises/lista';

  getPaises(): Observable<Pais[]>{
    return this.http.get<ResponsePais>(this.urlPaises).pipe(
      map(
        (response: ResponsePais) => {
          let paises = response.paises as Pais[];
          return paises;
        }
      )
    );
  }
}







