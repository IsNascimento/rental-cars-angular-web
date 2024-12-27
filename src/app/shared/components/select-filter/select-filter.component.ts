import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-filter',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.scss',
})
export class SelectFilterComponent {
  @Input() options: any[] = [];
  selectedOption: any = null;

  @Output() selectionChange = new EventEmitter<any>();

  onSelectChange(): void {
    const value = this.selectedOption ? this.selectedOption.value : null;
    this.selectionChange.emit(value);
  }
}
