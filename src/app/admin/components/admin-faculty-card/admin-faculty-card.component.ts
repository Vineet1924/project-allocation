import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-faculty-card',
  templateUrl: './admin-faculty-card.component.html',
  styleUrl: './admin-faculty-card.component.css',
})
export class AdminFacultyCardComponent {
  @Input() faculty: any = {};
  @Input() index: number = 0;
  @Output() facultyRemoveEmitter = new EventEmitter<any>();
  remove(f: any, index: number) {
    f.available = false;
    const data: any = {
      faculty: f,
      index: index,
    };
    this.facultyRemoveEmitter.emit(data);
  }
}
