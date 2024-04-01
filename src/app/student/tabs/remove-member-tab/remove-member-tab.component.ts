import { Component, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Student } from '../../interface/student';
import { Group } from '../../interface/group';

@Component({
  selector: 'app-remove-member-tab',
  templateUrl: './remove-member-tab.component.html',
  styleUrl: './remove-member-tab.component.css'
})

export class RemoveMemberTabComponent {
  @Input() student: Student;
  group: Group;
  groupMembers: any[];
  displayedColumns: string[] = ['No', 'Roll No', 'Name', 'cpi', 'Action'];

  constructor(
    private groupService: GroupService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadGroup();
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.student.group.id).toPromise();
      this.group = data;
      this.groupMembers = this.group.studentList.filter(member => member.id != this.student.id);
      console.log(this.groupMembers);
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  async removeMember(element: any) {
    try {
      await this.groupService.leaveGroup(element.id, this.group.id).toPromise();
      this.loadGroup();
    } catch (error) {
      this.loadGroup();
      console.log("Error while removing from the group : " + error);
    }
  }
}
