import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupModalComponent } from '../../components/create-group-modal/create-group-modal.component';
import { Student } from '../../interface/student';
import { UtilService } from '../../service/util.service';
import { Group } from '../../interface/group';
import { GroupService } from '../../service/group.service';
import { Project } from '../../interface/project';
import { GroupRequestComponent } from '../../components/group-request/group-request.component';
import { FacultyService } from '../../service/faculty.service';

@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.component.html',
  styleUrl: './group-tab.component.css',
})
export class GroupTabComponent {
  @Input() student: Student;
  @Output() leave: EventEmitter<void> = new EventEmitter<void>();
  profileId: string;
  group: Group = null;
  isGroupMember: boolean = false;
  displayedColumns: string[] = ['Priority', 'Title'];
  dataSource: Project[];
  isCreator: boolean = false;
  facultyChoices: any[];

  constructor(
    private dailog: MatDialog,
    private util_service: UtilService,
    private group_service: GroupService,
    private faculty_service: FacultyService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getStoredCookie();
    this.group = await this.util_service.load_group(this.student.group.id);
    if (this.group != null) {
      this.isGroupMember = true;
      this.dataSource = await this.util_service.load_project_choice(
        this.student.group.id
      );
      await this.loadFacultyChoice();
    }
    if (this.student.id == this.group.student.id) {
      this.isCreator = true;
    }
  }

  async leaveGroup(): Promise<void> {
    try {
      await this.group_service
        .leaveGroup(this.student.id, this.student.group.id)
        .toPromise();
    } catch (error) {
      this.getStoredCookie();
      this.isGroupMember = false;
      this.leave.emit();
      console.log('Error while leaving the group : ' + error);
    }
  }

  async loadFacultyChoice() {
    try {
      const data = await this.faculty_service
        .getAllFacultyChoices(this.group.id)
        .toPromise()
        .then((data) => {
          this.facultyChoices = data.sort((a, b) => a.priority - b.priority);
        });
      console.log(this.facultyChoices);
    } catch (error) {
      console.log('Error while loading choices : ' + error);
    }
  }

  async openRequstModal(): Promise<void> {
    const dialogRef = this.dailog.open(GroupRequestComponent, {
      width: '700px',
      height: '500px',
      data: this.student,
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.getStoredCookie();
      this.group = await this.util_service.load_group(this.student.group.id);
      if (this.group != null) {
        this.isGroupMember = true;
        this.dataSource = await this.util_service.load_project_choice(
          this.student.group.id
        );
      }
    });
  }

  async getStoredCookie(): Promise<any> {
    this.student = await this.util_service.load_profile(
      localStorage.getItem('id')
    );
  }

  openModal(): void {
    const dialogRef = this.dailog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '280px',
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this.getStoredCookie();
      this.group = await this.util_service.load_group(this.student.group.id);
      if (this.group != null) {
        this.isGroupMember = true;
        this.dataSource = await this.util_service.load_project_choice(
          this.student.group.id
        );
      }
    });
  }
}
