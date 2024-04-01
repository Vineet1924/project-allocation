import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.css'
})
export class RequestModalComponent {
  request: any[];
  filterReqeusts: any[];
  Student: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<RequestModalComponent>
  ) { }

  async ngOnInit(): Promise<void> {
    this.Student = this.data.student;
    await this.loadRequests();
  }

  async loadRequests(): Promise<void> {
    try {
      const data = await this.groupService.getStudentRequest(this.Student.id).toPromise();
      this.request = data.filter(item => item.status === "PENDING" && !item.studentRequested);
      this.filterReqeusts = data.filter(item => item.status === "PENDING" && !item.studentRequested);
      console.log(this.request[0]);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }


  handleCloseModal(success: boolean): void {
    var data;

    if (success) {
      data = {
        'action': true,
        'message': 'You join the group!'
      }
    } else {
      data = {
        'action': false,
        'message': 'You rejected the request'
      }
    }
    this.dialogRef.close(data);
  }
}
