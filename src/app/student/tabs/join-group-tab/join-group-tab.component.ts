import { Component, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../interface/student';

@Component({
  selector: 'app-join-group-tab',
  templateUrl: './join-group-tab.component.html',
  styleUrl: './join-group-tab.component.css'
})
export class JoinGroupTabComponent {
  groups: any[];
  searchText: string = '';
  filteredGroups: any[];
  filter: string = 'name';
  @Input() student: Student;

  constructor(
    private groupService: GroupService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.groupService.getAllGroup().subscribe((data) => {
      console.log(data);
      this.groups = data;
      this.filteredGroups = [...this.groups];
    });
  }

  onSearch(): void {
    if (this.searchText.trim() !== '') {
      this.filteredGroups = this.groups.filter(group =>
        group.groupName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        group.studentList.some(student => student.rollNumber.toString().includes(this.searchText.toLowerCase())) ||
        group.studentList.some(student => student.name.toString().includes(this.searchText.toLowerCase()))
      );
    } else {
      this.filteredGroups = [...this.groups];
    }
  }

  async loadGroups() {
    try {
      const data = await this.groupService.getAllGroup().toPromise();
      console.log(data);
      this.groups = data;
    } catch (error) {
      console.log("Error while loading all groups: " + error);
    }
  }
}
