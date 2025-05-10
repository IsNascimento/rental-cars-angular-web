import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  providers: [NotificationService],
  imports: [CommonModule, HttpClientModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  private http = inject(HttpClient);
  
  constructor(
    private notificationService: NotificationService
  ) {}

  selectedFile: File | null = null;
  fileName = '';
  fileSize = '';
  uploadProgress = 0;
  fileUploaded = false;
  uploadInProgress = false;
  showSuccessMessage = false;
  acceptedFileType = 'RTN'; // You can change this as needed
  maxFileSize = 10; // MB
  
  onFileSelected(event: Event): void {
    
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
      this.fileSize = (this.selectedFile.size / (1024 * 1024)).toFixed(1) + 'MB';
      this.fileUploaded = false;
      this.uploadProgress = 0;
    }
  }
  
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer?.files && event.dataTransfer.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      this.fileName = this.selectedFile.name;
      this.fileSize = (this.selectedFile.size / (1024 * 1024)).toFixed(1) + 'MB';
      this.fileUploaded = false;
      this.uploadProgress = 0;
    }
  }
  
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
  
  uploadFile(): void {
    if (!this.selectedFile) return;
    
    if (this.selectedFile.size > this.maxFileSize * 1024 * 1024) {
      alert(`O tamanho do arquivo não pode ser maior que ${this.maxFileSize}MB.`);
      return;
    }
    
    this.uploadInProgress = true;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      this.uploadProgress = Math.min(progress, 100);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.uploadInProgress = false;
          this.fileUploaded = true;
          this.notificationService.cleanSuccessMessage(
            'Sucesso',
            'Arquivo processado com sucesso'
          );          
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        }, 500);
      }
    }, 10);
    
  }
  
  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    this.fileName = '';
    this.fileSize = '';
    this.uploadProgress = 0;
    this.fileUploaded = false;
  }
  
  closeSuccessMessage(): void {
    this.showSuccessMessage = false;
  }
  
  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }
}