import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlugueisResponse } from '../model/alugueisResponse';

@Injectable({
  providedIn: 'root',
})
export class AlugueisService {
  private readonly API = 'api/alugueis';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<AlugueisResponse>(this.API);
  }
}
