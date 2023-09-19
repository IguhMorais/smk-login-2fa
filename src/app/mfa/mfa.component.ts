import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'smk-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.css']
})


export class MfaComponent implements OnInit{
  qrCodeImage: string = ''; 
  authForm:FormGroup;
  idCliente: number = 0;
  is2FaAtivo: boolean = false;
  
  constructor(private _formBuilder: FormBuilder, private _authServico : AuthService, private router: Router){
    console.log('estamos no mfa')
    this.authForm = this._formBuilder.group({
      codigoVerificador: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
    // Use history.state para acessar os dados passados pelo state na navegação
    const state = window.history.state;

    // Verifique se o estado possui os campos que você espera
    if (state && 'idCliente' in state && 'is2FaAtivo' in state) {
      this.idCliente = state.idCliente;
      this.is2FaAtivo = state.is2FaAtivo;
    } else {
      // Lida com o caso em que os dados do estado não estão presentes ou estão incompletos
      this.router.navigate(['/login']);
      console.error('Dados do estado não encontrados ou incompletos.');
    }

    if(!this.is2FaAtivo){
      this._authServico.getQRCodeUri(this.idCliente).subscribe({
        next:(response) =>{
          if(response.ok){
            const uri = response.data.uri;
            this.qrCodeImage = this._authServico.getQRCodeFromURI(uri)
          }
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }
  }

  verificarCodigo():void{
    if(this.idCliente){
      this._authServico.postVerificarCodigo(this.idCliente,this.authForm.get('codigoVerificador')?.value).subscribe({
        next:(response) => {
          if(response.ok){
            console.log('autenticado');
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

  abrirPlanilha(){
    // window.open(, '_blank');
  }
  
}
