import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'rentals-page',
  standalone: true,
  imports: [CommonModule, FileUploadComponent],
  template: `
    <div class="rentals-container">
      <app-file-upload></app-file-upload>
    </div>
  `,
})
export class RentalsPageComponent {
}