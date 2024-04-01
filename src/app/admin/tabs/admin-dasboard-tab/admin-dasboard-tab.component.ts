import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dasboard-tab',
  templateUrl: './admin-dasboard-tab.component.html',
  styleUrl: './admin-dasboard-tab.component.css',
})
export class AdminDasboardTabComponent implements OnInit, OnDestroy {
  selectedTab: string = 'tab1';
  students: any[] = [];
  faculties: any[] = [];
  student: any = {};
  private studentSubscription: Subscription;
  private facultySubscription: Subscription;
  studentView: boolean = false;
  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;
  constructor(
    private adminService: AdminService,
    private loader: NgxUiLoaderService
  ) {}
  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
    if (this.facultySubscription) {
      this.facultySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.loadStudents();
    this.loadFaculty();
  }

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  loadStudents(): void {
    this.studentSubscription = this.adminService.getAllStudents().subscribe(
      (data) => {
        console.log(data);
        this.students = data;
      },
      (error) => {
        console.error('Error loading students:', error);
      },
      () => {
        this.loader.stop();
      }
    );
  }

  loadFaculty(): void {
    this.facultySubscription = this.adminService.getAllFaculties().subscribe(
      (data) => {
        console.log('Faculties : ' + data);
        this.faculties = data;
      },
      (error) => {
        console.error('Error loading faculties:', error);
      },
      () => {
        this.loader.stop();
      }
    );
  }

  formatPhoneNumber(phone: string): string {
    if (phone && phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  }

  onRowClick(s) {
    console.log('clicked');
    this.student = s;
    this.studentView = true;
  }

  receiveDataFromChild(data: boolean) {
    this.studentView = data;
    this.student = {};
  }
}
