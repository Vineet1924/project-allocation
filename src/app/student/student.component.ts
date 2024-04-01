import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../authentication/service/login-service.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from './service/group.service';
import { ProfileService } from './service/profile.service';
import { Student } from './interface/student';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { UtilService } from './service/util.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  requests: any[] = [];
  student: Student;
  customErrorMessage: string;
  customSuccessMessage: string;

  constructor(
    private observer: BreakpointObserver,
    public router: Router,
    private loginService: LoginServiceService,
    private dailog: MatDialog,
    private groupService: GroupService,
    private profileService: ProfileService,
    private util_service: UtilService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getStoredCookie();
    await this.loadRequests();
    console.log(this.requests);
  }

  openModal(): void {
    const dialogRef = this.dailog.open(RequestModalComponent, {
      width: '450px',
      height: '600px',
      position: {
        top: '85px',
        right: '20px'
      },
      data: {
        "requests": this.requests,
        "student": this.student
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadRequests();

      if (result.action == true) {
        this.customSuccessMessage = result.message;
        setTimeout(() => {
          this.closeError();
        }, 4000);
      } else {
        this.customErrorMessage = result.message;
        setTimeout(() => {
          this.closeError();
        }, 4000);
      }
    });
  }

  async getStoredCookie(): Promise<any> {
    this.student = await this.util_service.load_profile(
      localStorage.getItem('id')
    );
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.student = data;
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  }

  async loadRequests(): Promise<void> {
    try {
      const data = await this.groupService.getStudentRequest(this.student.id).toPromise();
      this.requests = data.filter(item => item.status === "PENDING" && !item.studentRequested);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }

  closeError() {
    this.customErrorMessage = undefined;
    this.customSuccessMessage = undefined;
  }

  logoutClick() {
    this.router.navigate(['']);
    this.loginService.logout();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
