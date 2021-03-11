import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  cliente: any;
  urlImagen: string = 'http://localhost:8080/api/image/';
  boolMostrarBtn: boolean = false;
  mensajeImagen: string = 'Seleccionar imagen...';
  archivoImagen: any;
  boolCarga: boolean = true;
  progreso: number = 0;

  constructor(
    private servicioCliente: ClientesService,
    private paramsRuta: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getClienteById();
  }

  // Función para cargar datos de cliente
  getClienteById(){
    this.paramsRuta.params.subscribe(
      params => {
        const idRuta = params.id;
        if(idRuta != null){
          this.servicioCliente.getClienteById(idRuta).subscribe(
            response => {
              this.cliente = response;
              console.log(response)
            }
          )
        }
      }
    )
  }

  // Función para eliminar cliente por ID
  deleteById(id: number):void{
    Swal.fire({
      title: '¿Desea eliminar cliente?',
      text: `Cliente con ID: ${id} será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioCliente.deleteById(id).subscribe(
          response => {
            this.router.navigate(['/clientes']);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Cliente eliminado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
      }else if(result.dismiss === Swal.DismissReason.cancel){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Operación cancelada!',
          showConfirmButton: true,
          timer: 1500
        });
      }
    })
  }

  // Función para mostrar INPUT para carga de imagen
  mostrarInput(){
    this.boolMostrarBtn = !this.boolMostrarBtn;
  }

  // Función para seleccionar imagen
  imagenSeleccionada(event: any){
    this.archivoImagen = event.target.files[0];

    if(this.archivoImagen != null){
      const tipoArchivo: string = this.archivoImagen.type;
      this.mensajeImagen = this.archivoImagen.name;
      this.boolCarga = false;

      if(tipoArchivo.indexOf('image') == -1){
        this.archivoImagen = null;
        this.mensajeImagen = 'Seleccionar imagen...';
        this.boolCarga = true;
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Favor seleccione un archivo de tipo imagen',
          showConfirmButton: false,
          timer: 3500,
          toast: true
        });
        return;
      }
    }
  }

  // Función para cargar imagen
  cargaImagen(){
    this.boolCarga = true;
    this.servicioCliente
      .cargarImagen(this.archivoImagen, this.cliente.id)
      .subscribe((response :any) => {
        if(response.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((response.loaded / response.total!) * 100);
          console.log(this.progreso);
        }else if(response.type === HttpEventType.Response){
          this.cliente = response.body.cliente
          this.boolMostrarBtn = false;
          this.mensajeImagen = 'Seleccionar imagen...';
          this.archivoImagen = null;
          this.progreso = 0;

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Imagen actualizada con éxito.',
            showConfirmButton: false,
            timer: 3500
          });
        }
      });
  }
}


