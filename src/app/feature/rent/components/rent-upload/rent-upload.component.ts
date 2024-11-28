import {Component, inject, signal, ViewChild} from '@angular/core';
import {FileUpload, FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {ToastModule} from "primeng/toast";
import {NotificationService} from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-rent-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    BadgeModule,
    ToastModule
  ],
  templateUrl: './rent-upload.component.html',
  styleUrl: './rent-upload.component.scss',
  providers: [NotificationService]
})
export class RentUploadComponent {
  private _notificationService = inject(NotificationService);

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  fileStatus = signal<"UNSET" | "SELECTED" | "UPLOADING" | "UPLOADED">("UNSET");
  uploadProgress = signal<number>(0);
  selectedFile: File | null = null;

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file && file.name.endsWith('.rtn')) {
      this.selectedFile = file;
      this.fileStatus.set("SELECTED");
    } else {
      this._notificationService.errorMessage("Arquivo Inválido", "Somente arquivos .rtn são permitidos.");
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      const validFiles = files.filter(file => file.name.endsWith('.rtn'));

      if (validFiles.length !== files.length) {
        this._notificationService.errorMessage("Arquivo Inválido", "Somente arquivos .rtn são permitidos.");
      }

      if (validFiles.length > 0) {
        this.selectedFile = validFiles[0];
        this.fileStatus.set("SELECTED");
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onProgress(event: any) {
    console.log(event)
    this.uploadProgress.set(Math.round((event.loaded / event.total) * 100));
    console.log(event.loaded, event.total);
    if (this.uploadProgress() === 100) {
      this.fileStatus.set("UPLOADED");
    }
  }

  getFileSize(size: number): string {
    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / 1024 / 1024).toFixed(2) + ' MB';
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.fileStatus.set("UNSET");
    this.uploadProgress.set(0);
  }

  processFile() {
    if (this.selectedFile) {
      this.fakeUploadFile(this.selectedFile);
    }
  }

  private fakeUploadFile(file: File) {
    this.fileStatus.set("UPLOADING");
    const interval = setInterval(() => {
      let progress = this.uploadProgress();
      if (progress < 100) {
        progress += 10;
        this.uploadProgress.set(progress);
      } else {
        clearInterval(interval);
        this.fileStatus.set("UPLOADED");
        this._notificationService.successMessage("Sucesso", "Arquivo processado com sucesso.");
      }
    }, 500);
  }
}
