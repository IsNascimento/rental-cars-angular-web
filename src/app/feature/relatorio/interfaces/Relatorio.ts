import { Aluguel } from "./Aluguel";

export interface Relatorio {
    alugueis: Aluguel[];
    valorNaoPago: number;
}