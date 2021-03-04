import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPaisesComponent } from './main-paises/main-paises.component';
import { ListarPaisesComponent } from './listar-paises/listar-paises.component';
import { CrearActualizarComponent } from './crear-actualizar/crear-actualizar.component';

const routes: Routes = [
  {
    path: 'paises',
    component: MainPaisesComponent,
    children: [
      {path: 'listado', component: ListarPaisesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
