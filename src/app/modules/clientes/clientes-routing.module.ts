import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { MainClientesComponent } from './main-clientes/main-clientes.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { BuscarClienteComponent } from './buscar-cliente/buscar-cliente.component';
import { DetalleClienteComponent } from './detalle-cliente/detalle-cliente.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: MainClientesComponent,
    children: [
      {path: 'pagina/:numero',  component: ListadoClientesComponent   },
      {path: 'registrar',               component: RegistrarClienteComponent  },
      {path: 'detalle/:id',             component: DetalleClienteComponent    },
      {path: 'actualizar/:id',          component: RegistrarClienteComponent  },
      {path: 'buscar',                  component: BuscarClienteComponent     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
