import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'smk-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})
export class MfaComponent {
  authForm:FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private _auth : AuthService){
    console.log('estamos no mfa')
    this.authForm = this._formBuilder.group({
      codigoVerificador: ['', Validators.required],
      
    });
  }

  autenticar():void{
    console.log('autenticado')
  }
}

