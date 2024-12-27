export interface Report {
  id: number;
  modeloCarro: string;
  nomeCliente: string;
  telefoneCliente: string;
  dataAluguel: string;
  km: number;
  dataDevolucao: string | null;
  valor: number;
  statusPagamento: string;
}
