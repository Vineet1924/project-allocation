import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-faculty-popup',
  templateUrl: './faculty-popup.component.html',
  styleUrl: './faculty-popup.component.css',
})
export class FacultyPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ) {}
  faculties: any[] = this.data.f;
  click(f: any, index: number) {
    f.available = true;
    this.adminService.saveFaculty(f).subscribe(
      (response) => {
        if (response.success) {
          this.faculties.splice(index, 1);
          this.data.callback(f);
        } else {
          console.log('not success');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
