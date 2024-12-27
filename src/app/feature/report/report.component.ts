import { Component, OnInit } from '@angular/core';
import { DateFilterComponent } from '../../shared/components/date-filter/date-filter.component';
import { SelectFilterComponent } from '../../shared/components/select-filter/select-filter.component';
import { ReportTableComponent } from './report-table/report-table.component';
import { Report } from '../../shared/model/report.model';
import { ReportService } from '../../shared/services/report.service';
import { TitleContentComponent } from '../../shared/components/title-content/title-content.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    DateFilterComponent,
    SelectFilterComponent,
    ReportTableComponent,
    TitleContentComponent,
    ButtonModule,
    ReportTableComponent,
    DividerModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ReportService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  startDate?: Date;
  selectedModel?: string;

  models: { label: string; value: string | null }[] = [
    { label: 'Todos', value: null },
  ];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getCarModels().subscribe((models) => {
      this.models = models;
    });

    this.reportService.getFilteredReports().subscribe((reports) => {
      this.reports = reports;
      this.filteredReports = reports;
    });
  }


  onStartDateChange(date: Date): void {
    this.startDate = date;
    this.applyFilters();
  }

  onModelChange(model: string): void {
    this.selectedModel = model;
    this.applyFilters();
  }

  onSearch(): void {
    const formattedDate = this.startDate
      ? this.startDate.toLocaleDateString('pt-BR')
      : undefined;

    this.reportService.getFilteredReports(formattedDate, this.selectedModel).subscribe((reports) => {
      this.filteredReports = reports;
    });
  }

  applyFilters(): void {
    this.filteredReports = this.reports.filter((report) => {
      const date = new Date(report.dataAluguel);
      return (
        (!this.startDate || date >= this.startDate) &&
        (!this.selectedModel || report.modeloCarro === this.selectedModel)
      );
    });
  }

  protected readonly top = top;
}
