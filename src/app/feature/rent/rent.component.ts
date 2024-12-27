import {Component, OnInit} from '@angular/core';
import {TitleContentComponent} from '../../shared/components/title-content/title-content.component';
import {FileUploadComponent} from '../../shared/components/file-upload/file-upload.component';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    TitleContentComponent,
    FileUploadComponent,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
