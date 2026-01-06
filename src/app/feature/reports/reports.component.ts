import { Component } from '@angular/core';
import { HeaderComponent } from "../../core/template/header/header.component";
import { FooterComponent } from "../../core/template/footer/footer.component"; 
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common'; 

interface UploadedFile {
  name: string;
  extension: string;
  date: Date;
  size: number;
}
@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent,
    CommonModule,
    CurrencyPipe,
    FormsModule,
    HttpClientModule,
    TableModule,
    CardModule,
    ButtonModule,
    TabMenuModule,
    ToastModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  files: UploadedFile[] = [
    { name: 'documento1.pdf', extension: 'pdf', date: new Date('2023-10-01'), size: 204800 },
    { name: 'imagem1.jpg', extension: 'jpg', date: new Date('2023-10-02'), size: 51200 },
    { name: 'relatorio.xlsx', extension: 'xlsx', date: new Date('2023-10-03'), size: 102400 },
    { name: 'apresentacao.pptx', extension: 'pptx', date: new Date('2023-10-04'), size: 256000 },
    { name: 'texto.txt', extension: 'txt', date: new Date('2023-10-05'), size: 1024 }
  ];
   
  selectedFiles: FileList | null = null;

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  processFiles() {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles.item(i);
        if (file) {
          this.files.push({
            name: file.name,
            extension: file.name.split('.').pop() || '',
            date: new Date(),
            size: file.size
          });
        }
      }
      this.selectedFiles = null;  
    }
  }

  downloadFile(file: UploadedFile) { 
    console.log(`Downloading: ${file.name}`);
  }

}
