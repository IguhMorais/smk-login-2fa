import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'smk-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})


export class MfaComponent {
  qrCodeImage: string = ''; 
  authForm:FormGroup;
  
  constructor(private _formBuilder: FormBuilder, private _authServico : AuthService){
    console.log('estamos no mfa')
    this.authForm = this._formBuilder.group({
      codigoVerificador: ['', Validators.required],
      
    });
  }

  autenticar():void{
    this._authServico.postVerificarCodigo(this.authForm.get('codigoVerificador')?.value).subscribe({
      next:(response) => {
        if(response.ok){
          this._authServico.getQRCode().subscribe({
            next:(url) => {
              // Chama o serviço para gerar o QRCode a partir da URL
              this.qrCodeImage = this._authServico.getQRCodeFromURI(url);
          },
          error:(erro)=>{
            console.log(erro);
          }});
        }else{
          console.log('não autenticao');
        }
      }, error:(erro) => {
      // Lógica em caso de erro na verificação
        console.log(erro);  
      }
    });
  }

  
}
