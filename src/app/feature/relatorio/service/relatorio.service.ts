import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly API = 'api/alugueis/upload';

  constructor(private httpClient: HttpClient) {}

  enviarArquivo(formData: FormData | undefined) {
    return this.httpClient.post(this.API, formData).subscribe(
      (response) => {
        console.log('Processamento bem-sucedido', response);
      }
    );
  }
}
