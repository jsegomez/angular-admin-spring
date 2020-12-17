import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { MainClientesComponent } from './main-clientes/main-clientes.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { RegistarClienteComponent } from './registar-cliente/registar-cliente.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: MainClientesComponent,
    children: [
      {path: 'listado',   component: ListadoClientesComponent   },
      {path: 'registrar', component: RegistarClienteComponent   },
      {path: 'buscar',    component: BuscarClienteComponent     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
