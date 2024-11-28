import {Component, inject} from '@angular/core';
import {TableModule} from "primeng/table";
import {CarRentalModel} from "../../../../interfaces/car-rental.model";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-home-content-table',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
  ],
  templateUrl: './home-content-table.component.html',
  styleUrl: './home-content-table.component.scss',
  providers: [DatePipe, CurrencyPipe]
})
export class HomeContentTableComponent {

  private _datePipe = inject(DatePipe);
  private _currencyPipe = inject(CurrencyPipe);

  rentData: CarRentalModel[] = [
    {
      "dataAluguel": new Date("2022-01-02T03:00:00.000+00:00"),
      "modeloCarro": "GOL",
      "kmCarro": 87554,
      "nomeCliente": "Luciana Isis Maitê Ferreira",
      "telefoneCliente": "+55(14)99467-6214",
      "dataDevolucao": new Date("2022-01-12T03:00:00.000+00:00"),
      "valor": 399.7,
      "pago": "SIM"
    },
    {
      "dataAluguel": new Date("2022-01-02T03:00:00.000+00:00"),
      "modeloCarro": "RAV4",
      "kmCarro": 198966,
      "nomeCliente": "Luiz Thomas Peixoto",
      "telefoneCliente": "+55(48)98490-7165",
      "dataDevolucao": new Date("2023-01-06T03:00:00.000+00:00"),
      "valor": 2740,
      "pago": "SIM"
    },
    {
      "dataAluguel": new Date("2023-01-02T03:00:00.000+00:00"),
      "modeloCarro": "UNO",
      "kmCarro": 445580,
      "nomeCliente": "Geraldo Henry Bernardo da Conceição",
      "telefoneCliente": "+55(51)98665-6408",
      "dataDevolucao": new Date("2023-01-04T03:00:00.000+00:00"),
      "valor": 300,
      "pago": "NAO"
    },
  ]

  formatData(data: Date): string {
    return this._datePipe.transform(data, 'dd/MM/yyyy') || '';
  }

  get totalValue(): string {
    const total = this.rentData
      .filter(rent => rent.pago !== 'SIM')
      .reduce((sum, rent) => sum + rent.valor, 0);
    return this._currencyPipe.transform(total, 'BRL', 'symbol', '1.2-2') || '';
  }
}
