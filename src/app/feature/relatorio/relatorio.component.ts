import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { RelatorioService } from './service/relatorio.service';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule, FileUploadModule, ToastModule],
  providers: [RelatorioService, MessageService],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss',
})
export class RelatorioComponent {
  uploadedFiles: any[] = [];
  formData: FormData | undefined;
  arquivoEnviado: boolean = false;

  constructor(
    private http: HttpClient,
    private relatorioService: RelatorioService
  ) {}

  onUpload(event: any) {
    const files = event.files;
    if (!files || files.length === 0) {
      console.error('Nenhum arquivo selecionado');
      return;
    }

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);

    this.formData = formData;
    this.arquivoEnviado = true;
  }

  processarArquivo() {
    this.relatorioService.enviarArquivo(this.formData);
  }
}
