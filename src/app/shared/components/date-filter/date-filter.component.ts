import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [FormsModule, CalendarModule],
  templateUrl: './date-filter.component.html',
  styleUrl: './date-filter.component.scss',
})
export class DateFilterComponent {
  @Input() date?: Date;
  @Output() dateChange = new EventEmitter<Date>();

  onDateSelected(event: any) {
    this.dateChange.emit(this.date);
  }
}
