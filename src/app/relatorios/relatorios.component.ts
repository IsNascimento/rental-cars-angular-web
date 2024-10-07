import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Rental {
  date: string;
  model: string;
  km: number;
  client: string;
  phone: string;
  returnDate: string;
  paid: boolean;
  value: number;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  rentals: Rental[] = [];

  ngOnInit(): void {
    this.rentals = [
      { date: '30/09/2024', model: 'UNO', km: 50000, client: 'Jorge Amado Santos', phone: '(99) 98109-2912', returnDate: '30/09/2024', paid: true, value: 250 },
      { date: '30/09/2024', model: 'PALIO', km: 80000, client: 'Jorge Amado Santos', phone: '(99) 98109-2912', returnDate: '30/09/2024', paid: false, value: 200 },
      { date: '30/09/2024', model: 'GOL', km: 110000, client: 'Jorge Amado Santos', phone: '(99) 98109-2912', returnDate: '30/09/2024', paid: true, value: 250 },
      { date: '30/09/2024', model: 'SIENA', km: 200000, client: 'Jorge Amado Santos', phone: '(99) 98109-2912', returnDate: '30/09/2024', paid: true, value: 200 },
      { date: '30/09/2024', model: 'CELTA', km: 86000, client: 'Jorge Amado Santos', phone: '(99) 98109-2912', returnDate: '30/09/2024', paid: true, value: 200 }
    ];
  }
}