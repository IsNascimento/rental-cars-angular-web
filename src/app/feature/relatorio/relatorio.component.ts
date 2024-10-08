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

  constructor(
    private http: HttpClient,
    private relatorioService: RelatorioService,
    private messageService: MessageService
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
    if (!this.formData) {
      this.showError('Falha no carregamento do arquivo');
      return;
    }

    this.showSuccess('Arquivo carregado com sucesso. Pronto para processar.');
  }

  processarArquivo() {
    if (!this.formData) {
      this.showError('Nenhum arquivo selecionado');
      return;
    }

    this.relatorioService.enviarArquivo(this.formData).subscribe(
      (response) => {
        console.log('Processamento bem-sucedido', response);
        this.showSuccess('Processamento bem-sucedido.');
      },
      (error) => {
        console.error('Erro ao processar arquivo', error);
        const errorMessage = error.error
          ? error.error
          : 'Erro ao processar arquivo.';
        this.showError(errorMessage);
      }
    );

    this.formData = undefined;
  }

  showSuccess(detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail,
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail,
      life: 5000,
    });
  }
}
