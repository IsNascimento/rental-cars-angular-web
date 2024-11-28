import {Component, inject, OnInit} from '@angular/core';
import {NgStyle} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-filter-section',
  standalone: true,
  imports: [
    NgStyle,
    DividerModule,
    CalendarModule,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-filter-section.component.html',
  styleUrl: './home-filter-section.component.scss'
})
export class HomeFilterSectionComponent implements OnInit{

  filterForm!: FormGroup;

  private _fb = inject(FormBuilder);

  carModels: any[] = [
    {name: "Todos", code: "all"},
    { name: "GOL", code: "GOL" },
    { name: "POLO", code: "POLO" },
    { name: "VITRUS", code: "VITRUS" },
    { name: "JETTA", code: "JETTA" },
    { name: "COROLLA", code: "COROLLA" },
    { name: "RAV4", code: "RAV4" },
    { name: "FOCUS", code: "FOCUS" },
    { name: "UNO", code: "UNO" },
    { name: "MOBI", code: "MOBI" },
    { name: "ARGO", code: "ARGO" }
  ]

  ngOnInit(): void {
    this.filterForm = this._fb.group({
      data: ['', Validators.required],
      carModel: ['all', Validators.required],
    });
  }
}
