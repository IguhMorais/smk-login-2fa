import * as QRCode from 'qrcode-generator';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://sua-api.com'; // Substituir pela URL do luizao

  constructor(private http: HttpClient) {}

  // esse metodo que vai fazer a autenticacao
  postLogin(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  // provavelmente esse metodo para verifiar o codigo
  postVerificarCodigo(codigo: string): Observable<any> {
    const body = { codigo };
    return this.http.post(`${this.baseUrl}/verificar-codigo`, body);
  }

  // esse é o metodo para receber um QRCode por URI do luizaoS
  getQRCode(): Observable<string> {
    // Chama o endpoint para obter a URL da imagem QRCode
    return this.http.get<string>(`${this.baseUrl}/qrcode-uri`);
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
