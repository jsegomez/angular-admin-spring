import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import { ClienteClass } from '../../../models/cliente';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  cliente: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCliente();
  }

  // Formulario clientes
  public formRegistroCliente = this.formBuilder.group({
    nombre    : ['', [Validators.required, Validators.minLength(2)]],
    apellido  : ['', [Validators.required, Validators.minLength(2)]],
    email     : ['', [Validators.required, Validators.email       ]],
    createAt  : ['', [Validators.required]],
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

  // Obtener cliente para actualizar
  getCliente(){
    this.activateRoute.params.subscribe(
      params => {
        if(params.id != null){
          this.clienteService.getClienteById(params.id).subscribe(
            response => {
              this.cliente = response;
              const {nombre, apellido, email, createAt} = response;
              this.formRegistroCliente.setValue({nombre, apellido, email, createAt})
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
      const {nombre, apellido, email} = this.formRegistroCliente.value;
      const clienteUpdate: ClienteClass = {nombre, apellido, email, id, createAt}

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
        }
      );
    }
  }

}
