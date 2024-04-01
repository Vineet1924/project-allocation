import { Component, OnInit } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { LoginServiceService } from '../../authentication/service/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  edit: boolean = false;
  otherInterest: string = '';
  allDomains: any[] = [];
  faculty: any = {};
  facId: any = '';
  constructor(
    private facultyService: FacultyService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private loginService: LoginServiceService
  ) {
    this.getDataFromAPI();
    this.getDomainFromAPI();
  }

  ngOnInit() {}

  click() {
    if (this.edit === true) {
      this.facultyService.saveFaculty(this.faculty).subscribe(
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
    this.edit = !this.edit;
  }

  getDataFromAPI() {
    this.facultyService
      .getData(localStorage.getItem('email'))
      .subscribe((data) => {
        this.faculty = data;
        this.allDomains = this.allDomains.filter(
          (item1) =>
            !this.faculty.domainSet.some((item2) => item1.id === item2.id)
        );
        this.allDomains.filter((data) => {});
      });
  }

  getDomainFromAPI() {
    this.facultyService.getAllDomains().subscribe((data) => {
      this.allDomains = data;
      this.allDomains = this.allDomains.filter(
        (item1) =>
          !this.faculty.domainSet.some((item2) => item1.id === item2.id)
      );
    });
  }
  addClick() {
    const domain: any = {
      name: this.otherInterest,
    };
    this.otherInterest = '';
    this.facultyService.addDomain(domain).subscribe(
      (response) => {
        if (response.success) {
          this._snackBar.open('Domain Saved Successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.getDomainFromAPI();
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

  mapClicked(domainId: number) {
    console.log('domainId : ' + domainId + ' facId : ' + 1);

    this.facultyService
      .mapDomainWithFaculty(localStorage.getItem('email'), domainId)
      .subscribe(
        (response) => {
          if (response.success) {
            this._snackBar.open('Domain Mapped Successfully.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            // this.getDomainFromAPI();
            this.getDataFromAPI();
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
