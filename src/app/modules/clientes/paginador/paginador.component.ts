import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit{

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.capturarPaginaAct();
    this.crearPaginas();
  }

  // ============= Variables del componente ===============
  @Input() totalPaginas: number = 0
  @Input() primeraPagina: boolean = false;
  @Input() ultimaPagina: boolean = false;
  paginas: number[] = [];
  paginaActual: number = 0;
  desde: number = 0;
  hasta: number= 0;

  // ================= Funciones del componente ================
  // Crea el arreglo de paginas para dibujar el paginador
  crearPaginas(){
    // Creando rangos si paginas si total paginas > 10
    this.paginas = [];
    this.desde = Math.min(Math.max(0, this.paginaActual - 6), this.totalPaginas - 10);
    this.hasta = Math.max(Math.min(this.totalPaginas, this.paginaActual + 4), 10)

    if(this.totalPaginas > 10){
      for (let i = this.desde; i < this.hasta; i++) {
        i = i++;
        this.paginas.push(i);
      }
    }else{
      for (let i = 0; i < this.totalPaginas; i++) {
        i = i++;
        this.paginas.push(i);
      }
    }
  }

  // Capturamos pagina actual para usar en btn de flechas paginador
  capturarPaginaAct(){
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.paginaActual = Number(params.get('numero'));
        this.crearPaginas();
      }
    );
  }
}

