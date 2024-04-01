import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { TinymceComponent } from 'ngx-tinymce';
import { EmailService } from '../../../authentication/service/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrl: './communication.component.css',
})
export class CommunicationComponent implements OnInit, OnDestroy {
  allStudents: any[] = [];
  allFaculties: any[] = [];
  studentSubscribe: Subscription;
  facultySubscribe: Subscription;
  studentSelectionStatus: boolean[] = [];
  facultySelectionStatus: boolean[] = [];
  selectedStudents: string[] = [];
  selectedFaculties: string[] = [];

  allChecked: boolean = false;
  allFChecked: boolean = false;

  editorContent: string = '';
  subject: string = '';

  constructor(
    private adminService: AdminService,
    private emailService: EmailService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnDestroy(): void {
    this.studentSubscribe.unsubscribe();
    this.facultySubscribe.unsubscribe();
  }
  ngOnInit(): void {
    this.loadStudents();
    this.loadFaculties();
  }

  async loadStudents(): Promise<void> {
    this.studentSubscribe = this.adminService
      .getAllStudents()
      .subscribe((data) => {
        console.log(data);
        this.allStudents = data;
        this.allStudents.forEach(() => this.studentSelectionStatus.push(false));
        console.log('student length : ' + this.allStudents.length);
        console.log(
          'student selection status length : ' +
            this.studentSelectionStatus.length
        );
      });
  }

  studentSendClick() {
    console.log('clicked');
    if (this.type == 1) {
      this.studentSelectionStatus.forEach((data, index) => {
        if (data == true) {
          this.selectedStudents.push(this.allStudents[index].user.email);
          const emailRequest = {
            to: this.selectedStudents,
            subject: 'Portal Authentication Credentials',
            body: `<p><strong>Email : </strong>${this.allStudents[index].user.email}</p>
            <p><strong>Password : </strong>${this.allStudents[index].user.password}</p>`,
          };
          this.emailService.sendEmail(emailRequest).subscribe(
            (response) => {
              if (response.success) {
                this._snackBar.open(
                  `Email Sent To ${this.allStudents[index].user.email} Successfully`,
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top',
                  }
                );
              } else {
                this._snackBar.open(
                  'Error Occurred. Please Try Again.',
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top',
                  }
                );
              }
            },
            (error) => {
              this._snackBar.open(
                'Error Occurred. Please Try Again.',
                'Close',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                }
              );
            }
          );
        }
      });
    } else {
      this.studentSelectionStatus.forEach((data, index) => {
        if (data == true) {
          this.selectedStudents.push(this.allStudents[index].user.email);
        }
      });
      const emailRequest = {
        to: this.selectedStudents,
        subject: this.subject,
        body: this.editorContent,
      };

      console.log(this.editorContent);
      this.emailService.sendEmail(emailRequest).subscribe(
        (response) => {
          if (response.success) {
            this._snackBar.open('Email Sent To All Students.', 'Close', {
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

    this.studentSelectionStatus.fill(false);
    this.selectedStudents = [];
  }

  facultySendClick() {
    console.log('clicked');
    if (this.type == 1) {
      this.facultySelectionStatus.forEach((data, index) => {
        if (data == true) {
          const emailRequest = {
            to: [this.allFaculties[index].user.email],
            subject: 'Portal Authentication Credentials',
            body: `<p><strong>Email : </strong>${this.allFaculties[index].user.email}</p>
            <p><strong>Password : </strong>${this.allFaculties[index].user.password}</p>`,
          };
          this.emailService.sendEmail(emailRequest).subscribe(
            (response) => {
              if (response.success) {
                this._snackBar.open(
                  `Email Sent To ${this.allStudents[index].user.email} Successfully`,
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top',
                  }
                );
              } else {
                this._snackBar.open(
                  'Error Occurred. Please Try Again.',
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top',
                  }
                );
              }
            },
            (error) => {
              this._snackBar.open(
                'Error Occurred. Please Try Again.',
                'Close',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                }
              );
            }
          );
        }
      });
    } else {
      this.facultySelectionStatus.forEach((data, index) => {
        if (data == true) {
          this.selectedFaculties.push(this.allFaculties[index].user.email);
        }
      });
      const emailRequest = {
        to: this.selectedFaculties,
        subject: this.subject,
        body: this.editorContent,
      };

      console.log(this.editorContent);
      this.emailService.sendEmail(emailRequest).subscribe(
        (response) => {
          if (response.success) {
            this._snackBar.open('Email Sent To All Students.', 'Close', {
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

    this.facultySelectionStatus.fill(false);
    this.selectedFaculties = [];
  }

  async loadFaculties(): Promise<void> {
    this.facultySubscribe = this.adminService
      .getAllFaculties()
      .subscribe((data) => {
        this.allFaculties = data;
        this.allFaculties.forEach(() =>
          this.facultySelectionStatus.push(false)
        );
      });
  }

  type: number = 1;
  selectedTab: string = 'tab1';
  mainTypeClick(type: number) {
    this.type = type;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  userTabClick(i: number) {
    this.studentSelectionStatus[i] = !this.studentSelectionStatus[i];
  }

  facultyTabClick(i: number) {
    this.facultySelectionStatus[i] = !this.facultySelectionStatus[i];
  }

  allSelectedStatus(currentStatus: boolean) {
    this.allChecked = !currentStatus;
    this.studentSelectionStatus.fill(this.allChecked);
  }

  allSelectedFacultiesStatus(currentStatus: boolean) {
    this.allFChecked = !currentStatus;
    this.facultySelectionStatus.fill(this.allFChecked);
  }
}
