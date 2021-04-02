import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.obtenerDatosUsuario();
  }

  usuario: Usuario = new Usuario();

  obtenerDatosUsuario(){
    this.usuario = JSON.parse(localStorage.getItem('datos-usuario') || '');
  }

}
