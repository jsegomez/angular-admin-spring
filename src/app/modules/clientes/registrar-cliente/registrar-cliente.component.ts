import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { ClienteClass } from '../../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PaisesService } from '../../../services/paises.service';
import { Pais } from '../../../models/Pais.interface';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  cliente: any = null;
  paises: Pais[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private paisService: PaisesService,
    private activateRoute: ActivatedRoute,
    private clienteService: ClientesService,
  ) { }

  ngOnInit(): void {
    this.getPaises();
    this.getCliente();
  }

  // Formulario clientes
  public formRegistroCliente = this.formBuilder.group({
    nombre    : ['', [Validators.required, Validators.minLength(2)]],
    apellido  : ['', [Validators.required, Validators.minLength(2)]],
    email     : ['', [Validators.required, Validators.email       ]],
    createAt  : ['', [Validators.required]],
    pais      : ['']
  });

  // Validación de formulario
  campoInvalido(campo: string){
    if(
      this.formRegistroCliente.get(campo)?.invalid &&
      this.formRegistroCliente.get(campo)?.touched
    ){
      return true;
    }else{
      return false;
    }
  }

  // Método para registrar cliente
  registrarCliente(){
    if(this.formRegistroCliente.valid){
      const cliente: ClienteClass = this.formRegistroCliente.value;

      cliente.nombre = cliente.nombre.trim();
      cliente.apellido = cliente.apellido.trim();
      cliente.email = cliente.email.trim();

      this.clienteService.createCliente(cliente).subscribe(
        (response: any) => {
          this.router.navigate([`/clientes/detalle/${response.id}`]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente registrado con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
    }else{
      this.formRegistroCliente.markAllAsTouched();
    }
  }

  // Carga cliente para actualizar
  getCliente(){
    this.activateRoute.params.subscribe(
      params => {
        if(params.id != null){
          this.clienteService.getClienteById(params.id).subscribe(
            response => {
              this.cliente = response;
              const {nombre, apellido, email, createAt, pais} = response;
              this.formRegistroCliente.setValue({nombre, apellido, email, createAt, pais})
            }
          )
        }
      }
    )
  }

  // Actualizar cliente
  actualizarCliente(){
    if(this.formRegistroCliente.valid){
      const {id, createAt} = this.cliente;
      let {nombre, apellido, email, pais} = this.formRegistroCliente.value;

      nombre = nombre.trim();
      apellido = apellido.trim();
      email = email.trim();

      const clienteUpdate = {nombre, apellido, email, id, createAt, pais}

      console.log(clienteUpdate)

      this.clienteService.updateCliente(clienteUpdate).subscribe(
        response => {
          this.router.navigate([`/clientes/detalle/${response.id}`]);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente actualizado con éxito',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error => {
          console.log(error)
        }
      );
    }
  }

  // =========================== Obtener valores de formularios ========================
  // Obtener la lista de países
  getPaises(){
    this.paisService.getPaises().subscribe(
      response => {
        this.paises = response
      }
    );
  }

  // Comparar regiones para select
  compararRegion(obj1: Pais, obj2: Pais): boolean{
    return obj1 === null || obj2 === null ? false : obj1.id === obj2.id;
  }

}
