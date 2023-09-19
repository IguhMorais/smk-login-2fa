import * as QRCode from 'qrcode-generator';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://34.193.150.11:5000/'; // Substituir pela URL do luizao

  constructor(private http: HttpClient) {}

  // esse metodo que vai fazer a autenticacao
  postLogin(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  // Esse metodo pra quando o 2fa esta inativo
  getQRCodeUri(idUsuario: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/2fa/${idUsuario}`,{});
  }

  // Esse metodo pra quando o 2fa esta ativo
  postVerificarCodigo(idUsuario: number,codigoInserido:string): Observable<any> {
    const body = { codigoInserido };
    return this.http.post(`${this.baseUrl}/2fa/${idUsuario}`,body);
  }

  // Esse metodo pra quando não sei
  patchVerificarCodigo(idUsuario: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/2fa/${idUsuario}`,{});
  }

  getQRCodeFromURI(uri: string): string{
    // Gera o QRCode a partir da URL recebida
    const qr = QRCode(0, 'L'); // Cria uma instância do gerador de QRCode
    qr.addData(uri); // Define os dados (URL) para o QRCode
    qr.make(); // Gera o QRCode

    // Obtém a imagem base64 do QRCode
    const base64Image = qr.createDataURL(10, 0);
    return base64Image;
  }
}
