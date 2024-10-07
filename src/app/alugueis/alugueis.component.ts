import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-alugueis',
  standalone: true,
  imports: [NgIf],
  templateUrl: './alugueis.component.html',
  styleUrl: './alugueis.component.scss'
})
export class FileUploadComponent {
  fileName = '';
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  processFile(){
    if(this.selectedFile) {
      setTimeout(() => {
        alert('Arquivo processado com sucesso');
      }, 1000)
    }
  }
}