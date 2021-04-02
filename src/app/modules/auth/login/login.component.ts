import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // ========================== propiedades de la clase ==========================
  usuario: Usuario = new Usuario();

  // ========================== Funciones del componente ==========================
  // Formulario
  public formLogin = this.formBuilder.group({
    username  : ['', Validators.required],
    password  : ['', Validators.required]
  });

  // Función para validar campos formulario
  campoNoValido(campo: string){
    if(this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched){
      return true
    }else{
      return false
    }
  }

  // Función para inicio de sesión
  login(){
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      return;
    }

    this.usuario = this.formLogin.value;

    this.authService.login(this.usuario).subscribe(
      response => {
        localStorage.setItem('token-spring', response.access_token);
        this.router.navigate(['/clientes']);
        setTimeout(() => window.location.reload(), 15);
        const {nombre, apellido, nombre_usuario} = response;
        const datos_usuario =  {nombre, apellido, nombre_usuario}
        localStorage.setItem('datos-usuario', JSON.stringify(datos_usuario));
      }
    )
  }

}
