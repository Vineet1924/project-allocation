import { Component, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrl: './group-card.component.css'
})

export class GroupCardComponent {
  @Input() group: any;
  @Input() Student: any;
  studentList: any[];
  errorMessage: string = undefined;
  successMessage: string = undefined;
  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    this.studentList = this.group.studentList;
  }

  async sendRequest(): Promise<void> {
    console.log(this.group);
    if (this.group.studentList.length === 3) {
      this.errorMessage = "Group is full!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }
    try {
      await this.groupService.sendRequestByStudent(this.Student.id, this.group.id).toPromise();
    } catch (error) {
      setTimeout(() => {
        this.closeError();
      }, 4000);
      this.successMessage = "Request send!";
    }
  }

  closeError() {
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }
}
