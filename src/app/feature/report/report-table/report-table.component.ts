import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Report } from '../../../shared/model/report.model';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-report-table',
  standalone: true,
  imports: [TableModule, CurrencyPipe, DatePipe, TagModule, InputMaskModule, FormsModule],
  templateUrl: './report-table.component.html',
  styleUrl: './report-table.component.scss',
})
export class ReportTableComponent implements OnInit {
  private _filteredReports: Report[] = [];
  totalValue: number = 0;

  @Input()
  set filteredReports(reports: Report[]) {
    this._filteredReports = reports;
    this.calculateTotal();
  }

  get filteredReports(): Report[] {
    return this._filteredReports;
  }

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalValue = this._filteredReports.reduce((sum, report) => sum + (report.valor || 0), 0);
  }

  getPhoneMask(phone: string): string {
    return phone.length === 11 ? '(99) 99999-9999' : '(99) 9999-9999';
  }
}
