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
  
  constructor(private _formBuilder: FormBuilder,private router: Router,private _authServico : AuthService){

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this._authServico.postLogin(this.loginForm.get('email')?.value,this.loginForm.get('senha')?.value).subscribe({
      next:(response) => {
        if(response.ok){
          console.log('autenticado');
          this.router.navigate(['/mfa']);
        }else{
          console.log('não autenticao');
        }
      }, error:(erro) => {
      // Lógica em caso de erro na verificação
        console.log(erro);  
      }
    })
  
  }
}
