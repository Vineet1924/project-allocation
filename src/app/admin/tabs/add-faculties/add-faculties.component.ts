import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Faculty } from '../../interface/faculty';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-faculties',
  templateUrl: './add-faculties.component.html',
  styleUrl: './add-faculties.component.css',
})
export class AddFacultiesComponent {
  facultyForm: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.facultyForm = this.fb.group(
      {
        name: ['', Validators.required],
        experience: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }

  saveData() {
    let isEmpty = false;
    let passwordsMatch = true;
    Object.keys(this.facultyForm.controls).forEach((key) => {
      const control = this.facultyForm.get(key);
      if (control && control.value === '') {
        isEmpty = true;
        this._snackBar.open('One or more fields are empty', 'Close', {
          duration: 3000, // Duration in milliseconds
          verticalPosition: 'top', // Position of the snackbar
        });
      }
    });

    const password = this.facultyForm.get('password').value;
    const confirmPassword = this.facultyForm.get('confirmPassword').value;
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
      let faculty: Faculty = this.getFacultyObject();

      this.adminService.saveFaculty(faculty).subscribe(
        (response) => {
          if (response.success) {
            this._snackBar.open('Data Saved Successfully.', 'Close', {
              duration: 3000, // Duration in milliseconds
              verticalPosition: 'top', // Position of the snackbar
            });
            this.facultyForm.reset();
          } else {
            this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
              duration: 3000, // Duration in milliseconds
              verticalPosition: 'top', // Position of the snackbar
            });
          }
        },
        (error) => {
          this._snackBar.open('Error Occurred. Please Try Again.', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position of the snackbar
          });
        }
      );
    }
  }

  getFacultyObject(): Faculty {
    const formData = this.facultyForm.value;
    const faculty: Faculty = {
      name: formData.name,
      experience: formData.experience,
      phone: formData.phone,
      user: {
        email: formData.email,
        password: formData.password,
        type: 'faculty',
      },
      technologiesSet: [],
      domainSet: [],
      groupList: [],
    };
    return faculty;
  }
}
