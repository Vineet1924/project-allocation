import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Student } from '../../interface/student';
import { User } from '../../interface/user';
import { AdminService } from '../../service/admin.service';
@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrl: './add-students.component.css',
})
export class AddStudentsComponent {
  studentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    studentId: new FormControl('', Validators.required),
    rollNumber: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  constructor(
    private _snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  getStudentObject(): Student {
    const user: User = {
      email: this.studentForm.get('email').value,
      password: this.studentForm.get('password').value,
      type: 'student',
    };
    const student: Student = {
      name: this.studentForm.get('name').value,
      studentId: this.studentForm.get('studentId').value,
      rollNumber: Number(this.studentForm.get('rollNumber').value),
      year: new Date(this.studentForm.get('year').value),
      phone: this.studentForm.get('phone').value,
      user: user,
      resultList: [],
    };
    return student;
  }

  saveData() {
    let isEmpty = false;
    let passwordsMatch = true;
    Object.keys(this.studentForm.controls).forEach((key) => {
      const control = this.studentForm.get(key);
      if (control && control.value === '') {
        isEmpty = true;
        this._snackBar.open('One or more fields are empty', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'top', // Position of the snackbar
        });
      }
    });

    const password = this.studentForm.get('password').value;
    const confirmPassword = this.studentForm.get('confirmPassword').value;
    if (password !== confirmPassword) {
      passwordsMatch = false;
      this._snackBar.open('Passwords do not match', 'Close', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top', // Position of the snackbar
      });
    }

    if (isEmpty) {
      console.log('One or more fields are empty');
    } else if (!passwordsMatch) {
      console.log('Passwords do not match');
    } else {
      let student: Student = this.getStudentObject();
      this.adminService.saveStudent(student).subscribe((success) => {
        if (success) {
          this._snackBar.open('Data Saved Successfully.', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
          });
          this.studentForm.reset();
        } else {
          this._snackBar.open('Error Occur Please Try Again.', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
          });
        }
      });
    }
  }
}
