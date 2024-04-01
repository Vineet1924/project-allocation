import { Component } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrl: './group-view.component.css',
})
export class GroupViewComponent {
  task: any = {
    taskName: '',
    assignedDate: '',
    status: false,
  };
  groupId: number = 2;
  date: Date;
  allTaskList: any[] = [];
  totalTask: number = 0;
  completedTask: number = 0;
  pendingTask: number = 0;
  constructor(
    private facultyService: FacultyService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.getTask(2);
  }

  logDate(event: any) {
    const selectedDate = event.target.value;
    console.log('Selected Date:', selectedDate);
  }
  saveTask() {
    this.facultyService.saveTask(this.task, this.groupId).subscribe(
      (response) => {
        if (response.success) {
          this._snackBar.open('Data Saved Successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.getTask(2);
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

  getTask(groupId: number) {
    this.facultyService.getTask(groupId).subscribe((data) => {
      this.allTaskList = data;
      this.totalTask = this.allTaskList.length;
      this.allTaskList.forEach((element) => {
        if (element.status === true) this.completedTask += 1;
      });
      this.pendingTask = this.totalTask - this.completedTask;
    });
  }

  checkBoxClicked(event: any, index: number) {
    if (event.target.checked === true) {
      this.allTaskList[index].status = true;
      this.saveTaskToDatabase(this.allTaskList[index]);
      this.completedTask += 1;
      this.pendingTask -= 1;
    } else if (event.target.checked === false) {
      this.allTaskList[index].status = false;
      this.saveTaskToDatabase(this.allTaskList[index]);
      this.completedTask -= 1;
      this.pendingTask += 1;
    }
  }

  saveTaskToDatabase(task: any) {
    this.facultyService.saveTask(task, this.groupId).subscribe(
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

  isTaskVisible(task) {}

  onDateSelected(selectedDate: Date): void {
    selectedDate.setMinutes(
      selectedDate.getMinutes() - selectedDate.getTimezoneOffset()
    );
    this.task.assignedDate = selectedDate.toISOString().split('T')[0];
  }
  allClick() {
    this.task.assignedDate = '';
  }

  compareDates(date1: any, date2: any) {
    if (date1.split('T')[0] == date2) {
      return true;
    }
    return false;
  }

  addTask() {
    this.saveTask();
    this.task.taskName = '';
  }
}
