import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas del componente
import { PaisesRoutingModule } from './paises-routing.module';

// Modulo personalizado
import { SharedModule } from '../shared/shared.module';

// Componentes
import { CrearActualizarComponent } from './crear-actualizar/crear-actualizar.component';
import { ListarPaisesComponent } from './listar-paises/listar-paises.component';
import { MainPaisesComponent } from './main-paises/main-paises.component';

@NgModule({
  declarations: [
    CrearActualizarComponent,
    ListarPaisesComponent,
    MainPaisesComponent
  ],
  imports: [
    CommonModule,
    PaisesRoutingModule,
    SharedModule
  ],
  exports: [
    CrearActualizarComponent,
    ListarPaisesComponent,
    MainPaisesComponent
  ]
})
export class PaisesModule { }
