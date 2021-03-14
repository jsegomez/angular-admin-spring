import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public formLogin = this.formBuilder.group({
    username  : ['', Validators.required],
    password  : ['', Validators.required]
  });

  campoNoValido(campo: string){
    if(this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched){
      return true
    }else{
      return false
    }
  }

}
