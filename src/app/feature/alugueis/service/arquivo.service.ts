import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  private basePath = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  uploadArquivo(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('arquivo', file);
    const apiUrl = `${this.basePath}/alugueis/importar`;

    console.log('Enviando o arquivo...')
    return this.http.post(apiUrl, formData);
  }
}
