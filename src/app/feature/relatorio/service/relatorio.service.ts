import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly API = 'api/alugueis/upload';

  constructor(private httpClient: HttpClient) {}

  enviarArquivo(formData: FormData | undefined): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.httpClient.post(this.API, formData, { headers, responseType: 'text' });
  }
}
