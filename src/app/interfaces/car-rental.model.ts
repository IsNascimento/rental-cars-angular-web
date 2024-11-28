export interface CarRentalModel {
  dataAluguel: Date,
  modeloCarro: string;
  kmCarro: number;
  nomeCliente: string;
  telefoneCliente: string;
  dataDevolucao: Date,
  valor: number;
  pago: "SIM" | "NAO";
}
