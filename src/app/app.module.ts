import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Configurando region de nuestra aplicación
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es');

// Componentes
import { AppComponent } from './app.component';

// Modulo de rutas principal
import { AppRoutingModule } from './app-routing/app-routing.module';

// Modulos
import { SharedModule } from './modules/shared/shared.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ProductosModule } from './modules/productos/productos.module';
import { AuthModule } from './modules/auth/auth.module';
import { PaisesModule } from './modules/paises/paises.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ClientesModule,
    ProductosModule,
    AuthModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    PaisesModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
