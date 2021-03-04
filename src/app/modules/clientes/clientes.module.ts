import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { ClientesRoutingModule } from './clientes-routing.module';

// Modulo compartido
import { SharedModule } from '../shared/shared.module';

// Componentes
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { MainClientesComponent } from './main-clientes/main-clientes.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { PaginadorComponent } from './paginador/paginador.component';


@NgModule({
  declarations: [
    ListadoClientesComponent,
    MainClientesComponent,
    BuscarClienteComponent,
    DetalleClienteComponent,
    RegistrarClienteComponent,
    PaginadorComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListadoClientesComponent,
    MainClientesComponent,
    RegistrarClienteComponent,
    BuscarClienteComponent
  ]
})
export class ClientesModule { }
