import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phase-control',
  templateUrl: './phase-control.component.html',
  styleUrl: './phase-control.component.css',
})
export class PhaseControlComponent implements OnInit {
  allPhases: any[] = [];
  phase: any;
  constructor(
    private adminService: AdminService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminService.getAllPhases().subscribe((data) => {
      this.allPhases = data;
      this.phase = this.allPhases[0];
    });
  }

  phaseClick(index: number) {
    this.phase = this.allPhases[index];
  }

  openClick() {
    this.phase.open = true;
    this.adminService.savePhase(this.phase).subscribe(
      (response) => {
        if (response.success) {
          this._snackBar.open('Data Saved Successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
  closeClick() {
    this.phase.start = null;
    this.phase.end = null;
    this.phase.open = false;
    this.adminService.savePhase(this.phase).subscribe(
      (response) => {
        if (response.success) {
          this._snackBar.open('Data Saved Successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        } else {
          this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
