import { NotificationService } from '../../shared/services/notification.service';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import {HomeFilterSectionComponent} from "./components/home-filter-section/home-filter-section.component";
import {HomeContentTableComponent} from "./components/home-content-table/home-content-table.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, HomeFilterSectionComponent, HomeContentTableComponent],
  providers: [NotificationService, ConfirmDialogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {




}
