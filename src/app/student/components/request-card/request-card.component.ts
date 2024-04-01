import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Student } from '../../interface/student';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css'
})

export class RequestCardComponent {
  @Input() student: Student;
  @Input() requestData: any;
  @Output() closeModal = new EventEmitter<boolean>();
  id: string = '';
  group_name: string = '';
  student_name: string = '';
  Message: string = undefined;
  
  constructor(
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    console.log(this.requestData);
    this.id = this.requestData?.group.id || "";
    this.group_name = this.requestData.group.groupName;
  }

  async onAccept(): Promise<void> {
    if(this.student.group != null || this.student.group != undefined) {
      this.Message = "You are already in the group.";
      return;
    }

    if (this.requestData.group.studentList.length == 3) {
      this.Message = "Group is full!";
      return;
    }

    setTimeout(() => {
      this.closeError();
    }, 4000);

    try {
      const data = await this.groupService.approveRequest(this.requestData).toPromise();
      this.closeModal.emit(true);
    } catch (error) {
      console.log("Error while accepting the request : ")
      this.closeModal.emit(true);
    }
  }

  async onReject(): Promise<void> {
    setTimeout(() => {
      this.closeError();
    }, 4000);

    try {
      const data = await this.groupService.rejectRequest(this.requestData).toPromise();
      this.closeModal.emit(false);
    } catch (error) {
      console.log("Error while rejecting the request : ")
      this.closeModal.emit(false);
    }
  }

  closeError() {
    this.Message = undefined;
  }
}
