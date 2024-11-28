import { Component } from '@angular/core';
import {DividerModule} from "primeng/divider";
import {NgStyle} from "@angular/common";
import {RentUploadComponent} from "./components/rent-upload/rent-upload.component";

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    DividerModule,
    NgStyle,
    RentUploadComponent
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent {

}
