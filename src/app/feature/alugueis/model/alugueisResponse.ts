import { Aluguel } from "./aluguel";

export interface AlugueisResponse {
  alugueis: Aluguel[];
  valorTotalNaoPago: number;
}
