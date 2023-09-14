import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm:FormGroup;
  
  constructor(private _formBuilder: FormBuilder,private router: Router,private _auth : AuthService){

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log('chamando autenticacao')
    if (this.loginForm.valid) {
      // autenticação do usuário aqui, por exemplo,
      const autenticado = true;

      if (autenticado) {
      console.log('autenticado')

      // redirecionamento para a tela MFA.
      this.router.navigate(['/mfa']);
      console.log('redirecionado')

      }
    }
  }
}
