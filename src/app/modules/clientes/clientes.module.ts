import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas
import { ClientesRoutingModule } from './clientes-routing.module';

// Modulo compartido
import { SharedModule } from '../shared/shared.module';

// Componentes
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { MainClientesComponent } from './main-clientes/main-clientes.component';
import { RegistarClienteComponent } from './registar-cliente/registar-cliente.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';

@NgModule({
  declarations: [
    ListadoClientesComponent,
    MainClientesComponent,
    RegistarClienteComponent,
    BuscarClienteComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule
  ],
  exports: [
    ListadoClientesComponent,
    MainClientesComponent,
    RegistarClienteComponent,
    BuscarClienteComponent
  ]
})
export class ClientesModule { }
