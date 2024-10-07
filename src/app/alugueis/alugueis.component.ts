import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alugueis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.scss']
})
export class FileUploadComponent {
  fileName = '';
  selectedFile: File | null = null;
  showSuccessMessage = false;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  processFile() {
    if (this.selectedFile) {
      setTimeout(() => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }, 1000);
    } else {
      alert('Por favor, selecione um arquivo primeiro.');
    }
  }
}