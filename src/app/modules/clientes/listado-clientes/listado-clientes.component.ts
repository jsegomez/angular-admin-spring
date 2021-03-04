import { Component, OnInit, Output } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente, ClienteClass } from '../../../models/cliente';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  constructor(
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) { }

  // ========================= Variables del componente ===================
  clientes: any[] = [];
  totalPaginas: number = 0;
  primeraPagina: boolean = false;
  ultimaPagina: boolean = false;
  urlImage: string = 'http://localhost:8080/api/image/';

  ngOnInit(): void {
    this.getClientes();
  }

  // Obtener lista de clientes
  getClientes(){
    this.activatedRoute.paramMap.subscribe(
      params => {
        const pagina = params.get('numero');
        if(pagina != null){
          this.clienteService.getClientesPaginados(pagina).subscribe(
            response => {
              this.clientes = response.content;
              this.primeraPagina = response.first
              this.ultimaPagina = response.last
              this.totalPaginas = response.totalPages
            }
          )
        }
      }
    );
  }

  // Función para eliminar cliente
  deleteById(cliente: ClienteClass): void{
    Swal.fire({
      title: '¿Desea eliminar cliente?',
      text: `Cliente con id: ${cliente.id} será eliminado!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteById(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(
              client => client != cliente
            )
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'Cliente eliminado con éxito!.',
          timer: 1500
        })
      }else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire({
          icon: 'error',
          title: 'Cancelado',
          text: 'Operación fue cancelada!',
          timer: 1400
        })
      }
    })
  }

}


