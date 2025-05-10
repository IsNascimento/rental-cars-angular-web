import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RentalReport {
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
  selector: 'app-car-rental-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-rental-reports.component.html',
  styleUrls: ['./car-rental-reports.component.scss']
})
export class CarRentalReportsComponent {
  // Data
  rentalReports: RentalReport[] = [
    { 
      date: '30/09/2024', 
      model: 'UNO', 
      km: 50000, 
      client: 'Jorge Amado Santos', 
      phone: '(99) 98109-2912', 
      returnDate: '30/09/2024', 
      paid: true, 
      value: 250.00 
    },
    { 
      date: '30/09/2024', 
      model: 'PALIO', 
      km: 80000, 
      client: 'Jorge Amado Santos', 
      phone: '(99) 98109-2912', 
      returnDate: '30/09/2024', 
      paid: false, 
      value: 200.00 
    },
    { 
      date: '30/09/2024', 
      model: 'GOL', 
      km: 110000, 
      client: 'Jorge Amado Santos', 
      phone: '(99) 98109-2912', 
      returnDate: '30/09/2024', 
      paid: true, 
      value: 250.00 
    },
    { 
      date: '30/09/2024', 
      model: 'SIENA', 
      km: 200000, 
      client: 'Jorge Amado Santos', 
      phone: '(99) 98109-2912', 
      returnDate: '30/09/2024', 
      paid: true, 
      value: 200.00 
    },
    { 
      date: '30/09/2024', 
      model: 'CELTA', 
      km: 86000, 
      client: 'Jorge Amado Santos', 
      phone: '(99) 98109-2912', 
      returnDate: '30/09/2024', 
      paid: true, 
      value: 200.00 
    }
  ];

  // Form inputs
  rentalDate: string = '';
  carModel: string = '';
  
  // Available car models
  carModels: string[] = ['Todos', 'UNO', 'PALIO', 'GOL', 'SIENA', 'CELTA'];
  
  // UI state
  showCalendar: boolean = false;
  showModelDropdown: boolean = false;
  sortField: string = 'date';
  sortDirection: string = 'desc';
  
  // Month days for calendar
  calendarDays: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  weekdays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  // Element references for click outside detection
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  @ViewChild('modelDropdownContainer') modelDropdownContainer!: ElementRef;

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close calendar if clicked outside
    if (this.showCalendar && this.calendarContainer && 
        !this.calendarContainer.nativeElement.contains(event.target)) {
      this.showCalendar = false;
    }
    
    // Close model dropdown if clicked outside
    if (this.showModelDropdown && this.modelDropdownContainer && 
        !this.modelDropdownContainer.nativeElement.contains(event.target)) {
      this.showModelDropdown = false;
    }
  }

  // Toggle calendar visibility
  toggleCalendar(event: Event): void {
    event.stopPropagation();
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.showModelDropdown = false;
    }
  }
  
  // Toggle model dropdown visibility
  toggleModelDropdown(event: Event): void {
    event.stopPropagation();
    this.showModelDropdown = !this.showModelDropdown;
    if (this.showModelDropdown) {
      this.showCalendar = false;
    }
  }
  
  // Select a date from calendar
  selectDate(day: number): void {
    this.rentalDate = `${day < 10 ? '0' + day : day}/09/2024`;
    this.showCalendar = false;
  }
  
  // Select a car model from dropdown
  selectModel(model: string): void {
    this.carModel = model;
    this.showModelDropdown = false;
  }
  
  // Clear car model filter
  clearModel(event: Event): void {
    event.stopPropagation();
    this.carModel = '';
  }
  
  // Handle search button click
  search(): void {
    alert('Pesquisa realizada!');
    // In a real application, this would filter the data based on inputs
  }
  
  // Sort table by column
  sortTable(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    
    this.rentalReports = [...this.rentalReports].sort((a, b) => {
      let compareA: any = a[field as keyof RentalReport];
      let compareB: any = b[field as keyof RentalReport];
      
      if (field === 'km' || field === 'value') {
        return this.sortDirection === 'asc' 
          ? compareA - compareB 
          : compareB - compareA;
      }
      
      if (typeof compareA === 'string' && typeof compareB === 'string') {
        return this.sortDirection === 'asc'
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      }
      
      if (typeof compareA === 'boolean' && typeof compareB === 'boolean') {
        const boolValue = this.sortDirection === 'asc' ? 1 : -1;
        return compareA === compareB ? 0 : compareA ? boolValue : -boolValue;
      }
      
      return 0;
    });
  }
  
  // Check if a column is currently sorted
  isSortedColumn(field: string): boolean {
    return this.sortField === field;
  }
  
  // Format currency with comma decimal separator
  formatCurrency(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }
  
  // Calculate total debt (unpaid rentals)
  get totalDebt(): number {
    return this.rentalReports
      .filter(report => !report.paid)
      .reduce((sum, report) => sum + report.value, 0);
  }
}