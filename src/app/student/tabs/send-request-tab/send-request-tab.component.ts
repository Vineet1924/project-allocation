import { Component, Input } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { GroupService } from '../../service/group.service';
import { Student } from '../../interface/student';
import { Group } from '../../interface/group';

@Component({
  selector: 'app-send-request-tab',
  templateUrl: './send-request-tab.component.html',
  styleUrl: './send-request-tab.component.css'
})
export class SendRequestTabComponent {
  @Input() student: Student;
  Message: string = undefined;
  erroMessage: string = undefined;
  group: Group;
  displayedColumns: string[] = ['No', 'Roll No', 'Name', 'cpi', 'Action'];
  students: any[];
  filterStudents: any[];

  constructor(
    private profileService: ProfileService,
    private groupService: GroupService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadAllStudents();
    await this.loadGroup();
    const groupStudents = this.group.studentList.map(student => student.id);
    console.log(this.group.studentList);
    this.students = this.students.filter(student => !groupStudents.includes(student.id));
    this.filterStudents = [...this.students];
  }

  async loadAllStudents() {
    try {
      const data = await this.profileService.getAll().toPromise();
      this.students = data;
      this.filterStudents = data;
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  searchStudents(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterStudents = this.students;
      return;
    }

    const searchResults = this.students.filter(student =>
      student.name.toString().toLowerCase().includes(searchText) ||
      student.rollNumber.toString().toLowerCase().includes(searchText)
    );

    this.filterStudents = [...searchResults];
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.student.group.id).toPromise();
      this.group = data;
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  sendRequest(element: any): void {
    if(this.student.group.studentList.length >= 3) {
      this.erroMessage = "Your group is already full!";
      setTimeout(() => {
        this.erroMessage = undefined;
      }, 7000);
      return;
    }

    try {
      const data = this.groupService.sendRequest(element.id, this.group.id).toPromise();
      this.Message = "Request send!";
      setTimeout(() => {
        this.Message = undefined;
      }, 7000);

    } catch (error) {
      console.log("Error while sending the request : " + error);
    }
  }
}
