import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FileProgressEvent, FileSelectEvent, FileUpload, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import {NotificationService} from '../../services/notification.service';
import {StyleClassModule} from 'primeng/styleclass';
import {TitleContentComponent} from '../title-content/title-content.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [FileUploadModule,
    ToastModule, HttpClientModule, DividerModule, ProgressBarModule, CommonModule, StyleClassModule, TitleContentComponent],
  providers: [NotificationService],
  standalone: true
})
export class FileUploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private notificationService = inject(NotificationService);

  @ViewChild('componenteUpload') fileUpload!: FileUpload;

  uploadProgress: number = 0;
  selectedFile: File | null = null;
  fileSize: string = "";
  loading: boolean = false;

  onTemplatedUpload() {
    this.notificationService.successMessage("Sucesso", "Arquivo processado com sucesso.");
    this.clearFile();
    this.loading = false;
    this.uploadProgress = 0;
  }

  onError() {
    this.notificationService.errorMessage("Erro", "Falha ao carregar arquivo.");
    this.clearFile();
    this.loading = false;
    this.uploadProgress = 0;
  }

  onSelectedFiles(event: FileSelectEvent) {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      this.fileSize = this.getFileSize(this.selectedFile.size);
    } else {
      this.notificationService.errorMessage("Erro", "Nenhum arquivo válido foi selecionado.");
    }
  }

  choose() {
    this.fileUpload.choose();
  }

  clearFile(){
    this.fileUpload.clear();
  }

  processFile() {
    if (this.fileUpload && this.selectedFile) {
      this.fileUpload.upload();
      this.loading = true;
    } else {
      this.notificationService.errorMessage("Erro", "Nenhum arquivo selecionado para upload.");
    }
  }


  onProgress(event : FileProgressEvent){
    this.uploadProgress = event.progress;
  }

  getFileSize(size: number): string {
    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / 1024 / 1024).toFixed(2) + ' MB';
    }
  }

}
