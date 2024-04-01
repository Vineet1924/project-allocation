import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginServiceService } from '../authentication/service/login-service.service';
import { AdminService } from './service/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  phaseSubscription: Subscription;
  phase: any = {};
  differenceInSec: any = {};
  constructor(
    private observer: BreakpointObserver,
    public router: Router,
    private loginService: LoginServiceService,
    private adminService: AdminService
  ) {}
  ngOnInit(): void {
    this.loadPhase();
  }

  loadPhase() {
    this.phaseSubscription = this.adminService.getAllPhases().subscribe(
      (data) => {
        console.log(data);
        this.phase = data;
        localStorage.setItem('phase', JSON.stringify(this.phase));
        const currentTime = new Date().toISOString().slice(0, 16);
        for (const element of this.phase) {
          if (element.open && element.end >= currentTime) {
            const differenceInMilliseconds = this.findTimeDifference(
              element.end
            );
            setTimeout(() => {
              if (element.id == 1) {
                // group assignment
                this.groupAssign();
              } else if (element.id == 2) {
                // project assignment
                this.projectAssign();
              } else {
                // faculty assignment
                this.facultyAssign();
              }
            }, differenceInMilliseconds);
            break;
          }
        }
      },
      (error) => {
        console.error('Error loading phase:', error);
      }
    );
  }

  groupAssign() {
    this.adminService.groupAllocation().subscribe((data) => {
      console.log('Rank Assigned');
    });
  }
  projectAssign() {
    this.adminService.projectAllocation().subscribe((data) => {
      console.log('project Assigned');
    });
  }
  facultyAssign() {
    this.adminService.facultyAllocation().subscribe((data) => {
      console.log('Faculty Assigned');
    });
  }

  findTimeDifference(dateTime1: string): number {
    const date1 = new Date(dateTime1).getTime();
    const date2 = new Date().getTime();
    return Math.abs(date1 - date2);
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

  logoutClick() {
    this.router.navigate(['']);
    this.loginService.logout();
  }
}
