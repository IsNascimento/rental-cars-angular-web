import { Component, ViewChild } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { TitleContentComponent } from "../../shared/components/title-content/title-content.component";
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ArquivoService } from './service/arquivo.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-alugueis',
  standalone: true,
  imports: [
    BadgeModule,
    CommonModule,
    DividerModule,
    FileUploadModule,
    TitleContentComponent,
    ToastModule,
  ],
  templateUrl: './alugueis.component.html',
  styleUrls: ['./alugueis.component.scss']
})
export class AlugueisComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  selectedFile: File | null = null;
  hasFile: boolean = false;
  progress: number = 0;

  constructor(private config: PrimeNGConfig, private messageService: MessageService, private arquivoService: ArquivoService) { }

  choose(event: any, callback: () => void) {
    callback();
  }

  onSelectedFiles(event: any): void {
    console.log('Evento no onSelect', event);
    if (event && event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      this.hasFile = true;
      this.progress = 0;
      console.log('Arquivo selecionado:', this.selectedFile);
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
  }

  onTemplatedUpload() {
    if (this.selectedFile) {
      this.arquivoService.uploadArquivo(this.selectedFile).subscribe({
        next: (event: any) => {
          console.log(event)
          if (event.mensagem === 'Arquivo importado com sucesso.') {
            this.showSuccessToast();
          } else {
            this.showFailToast();
          }
        },
        error: (error) => {
          this.showFailToast();
          console.error('Erro ao enviar o arquivo:', error);
        }
      });
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Arquivo processado com sucesso',
      life: 3000
    });
  }

  showFailToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Falhar',
      detail: 'Falha ao processar arquivo',
      life: 3000
    });
  }

  simulateUploadProgress() {
    this.progress = 0;

    const interval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(interval);
      } else {
        this.progress += 10;
      }
    }, 300);
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.selectedFile = null;
    this.hasFile = false;
    this.progress = 0;
  }

  clearFile(): void {
    this.selectedFile = null;
    this.hasFile = false;
    this.progress = 0;
    this.fileUpload.clear();
    this.fileUpload.files = [];
  }
}
