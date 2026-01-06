import { Component } from '@angular/core';
import { FooterComponent } from "../../core/template/footer/footer.component";
import { HeaderComponent } from "../../core/template/header/header.component";
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common'; 

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule, CurrencyPipe],  
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'] 
})
export class DocumentComponent {
  filterDate: string = '';
  filterModel: string = '';
  reports: any[] = []; 
  totalValue: number = 0;

  constructor() {
  
    this.reports = [
      { date: '2023-10-01', model: 'Onix', km: 100, client: 'Pedro Alcantara', phone: '123456789', returnDate: '2023-10-05', paid: true, value: 100 },
      { date: '2022-10-02', model: 'Civic', km: 200, client: 'Barão de Maua', phone: '987654321', returnDate: '2020-05-06', paid: false, value: 200 },
      { date: '2023-07-26', model: 'Toro', km: 200, client: 'Maria Quiteria', phone: '9876525698', returnDate: '2019-10-06', paid: true, value: 350 },
      { date: '2020-01-29', model: 'Renegate', km: 200, client: 'Bruna Gomes', phone: '987654321', returnDate: '2026-01-03', paid: true, value: 120 },
      { date: '2019-10-02', model: 'Tera', km: 75, client: 'Aline Brava', phone: '987654321', returnDate: '2021-08-03', paid: false, value: 3789 },
      { date: '2015-11-02', model: 'Kardian', km: 28, client: 'Mauricio Neto', phone: '987654321', returnDate: '2026-01-04', paid: false, value: 7852 },
    ];

    this.calculateTotal();
  }

  search() {    
    console.log('Buscando por:', this.filterDate, this.filterModel);
  }

  calculateTotal() {
    this.totalValue = this.reports.reduce((sum, report) => sum + report.value, 0);
  }

  addCar() { 
    console.log('Adicionando carro...');
  }
}