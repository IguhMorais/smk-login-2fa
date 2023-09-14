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

  // esse é o metodo para receber um QRCode por URI do luizao
  getQRCode(): Observable<any> {
    return this.http.get(`${this.baseUrl}/qrcode-uri`);
  }
}
