import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-result-popup',
  templateUrl: './admin-result-popup.component.html',
  styleUrls: ['./admin-result-popup.component.css'],
})
export class AdminResultPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public adminService: AdminService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AdminResultPopupComponent> // Inject MatDialogRef
  ) {}
  result = { semNo: this.data.semNo, spi: '', cpi: '' };
  studentID = this.data.student.id;
  resultFound = false;
  showProgressBar: boolean = false;

  handleClick(semNo: number) {
    this.showProgressBar = true;
    this.data.student.resultList.forEach((result) => {
      if (result.semNo === semNo) {
        result.spi = this.result.spi;
        result.cpi = this.result.cpi;
        this.resultFound = true;
        // post this to api/result/<studentID>
        this.adminService.addUpdateResult(result, this.studentID).subscribe(
          (response) => {
            if (response.success) {
              this._snackBar.open('Data Saved Successfully.', 'Close', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
              });
              this.dialogRef.close();
              this.showProgressBar = false;
            } else {
              this._snackBar.open(
                'Error Occurred. Please Try Again.',
                'Close',
                {
                  duration: 3000,
                  verticalPosition: 'bottom',
                  horizontalPosition: 'right',
                }
              );
            }
          },
          (error) => {
            this.showProgressBar = false;
            this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        );
      }
    });

    if (!this.resultFound) {
      const newResult = {
        semNo: semNo,
        spi: this.result.spi,
        cpi: this.result.cpi,
      };
      this.data.student.resultList.push(newResult);
      // post this to api/result/<studentID>
      this.adminService.addUpdateResult(newResult, this.studentID).subscribe(
        (response) => {
          if (response.success) {
            this.showProgressBar = false;
            this._snackBar.open('Data Saved Successfully.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
            this.dialogRef.close();
          } else {
            this.showProgressBar = false;
            this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
            });
          }
        },
        (error) => {
          this.showProgressBar = false;
          this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
      );
    }
  }
}
