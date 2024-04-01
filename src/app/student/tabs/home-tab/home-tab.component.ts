import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../../components/profile-modal/profile-modal.component';
import { FlowModalComponent } from '../../components/flow-modal/flow-modal.component';
import { Student } from '../../interface/student';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrl: './home-tab.component.css',
})
export class HomeTabComponent {
  profileId: string;
  student: Student;
  profileImage = '../../../assets/profile-student.png';
  semester: string;
  cpi: string;
  students: any[];

  constructor(private util_service: UtilService, private dailog: MatDialog) { }

  displayedColumns: string[] = ['no', 'student_id', 'name', 'email', 'cpi'];

  async ngOnInit(): Promise<void> {
    await this.getStoredCookie();
    this.students = await this.util_service.load_students();
    this.openFlowModal();
  }

  async getStoredCookie(): Promise<any> {
    this.student = await this.util_service.load_profile(
      localStorage.getItem('id')
    );
    if (this.student.result_list && this.student.result_list.length > 0) {
      const lastResult =
        this.student.result_list[this.student.result_list.length - 1];
      if (lastResult) {
        if (typeof lastResult.semNo !== 'undefined') {
          this.semester = lastResult.semNo.toString();
        }
        if (typeof lastResult.cpi !== 'undefined') {
          this.cpi = lastResult.cpi.toString();
        }
      }
    }
  }

  openModal(rowData: Student): void {
    const dialogRef = this.dailog.open(ProfileModalComponent, {
      width: '500px',
      data: rowData,
    });

    dialogRef.afterClosed().subscribe(() => { });
  }

  openFlowModal(): void {
    const dailogRef = this.dailog.open(FlowModalComponent, {
      width: '500px',
      height: '700px',
    });

    dailogRef.afterClosed().subscribe(() => { });
  }
}
