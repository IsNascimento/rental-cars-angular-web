import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { AluguelServiceService } from '../../shared/services/aluguel-service.service';
import { NotificationService } from '../../shared/services/notification.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-aluguel',
  standalone: true,
  imports: [FileUploadModule,
    CommonModule
  ],
  providers: [NotificationService],
  templateUrl: './aluguel.component.html',
  styleUrl: './aluguel.component.scss'
})
export class AluguelComponent {

  @ViewChild('fileUploadRef') fileUploadRef!: FileUpload;
  selectedFile: File | null = null;

  constructor(private aluguelService: AluguelServiceService,
    private notificationService: NotificationService,
  ) { }

  onUpload(event: any) {
    console.log('File selected:', event);
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onRemove(event: any) {
    this.selectedFile = null;
  }

  processarArquivo() {
    console.log('Arquivo selecionado:', this.selectedFile);
    if (this.selectedFile) {
      this.aluguelService.uploadFileAluguel(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
          if (response instanceof HttpResponse && response.status === 200) {
            this.notificationService.successMessage(
              'Sucesso',
              'Arquivo processado com sucesso!'
            );
          }

        },
        error: (error) => {
          console.error('Upload failed', error);
          this.notificationService.errorMessage(
            'Erro',
            'Ocorreu um erro ao processar o arquivo: ' + error.message
          );
        }
      });
      this.fileUploadRef.clear();
      this.selectedFile = null; // Clear the selected file after processing
    }
  }
}
