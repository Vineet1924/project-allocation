import { Component, Inject, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../interface/student';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-group-request',
  templateUrl: './group-request.component.html',
  styleUrl: './group-request.component.css'
})
export class GroupRequestComponent implements OnInit{
  displayedColumns: string[] = ['no', 'rollNumber', 'name', 'cpi', 'action'];
  request: any[];
  filterRequest: any[];
  student: Student;
  Message: string = undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<GroupRequestComponent>
  ) {}

  async ngOnInit(): Promise<void> {
    this.student = this.data;
    await this.loadRequests();
  }

  searchRequests(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterRequest = this.request;
      return;
    }

    const searchResults = this.request.filter(request =>
      request.student.name.toString().toLowerCase().includes(searchText) ||
      request.student.rollNumber.toString().toLowerCase().includes(searchText) ||
      request.student.resultList[request.student.resultList.length - 1].cpi.toString().toLowerCase().includes(searchText)
    );

    this.filterRequest = [...searchResults];
  }

  async loadRequests(): Promise<void> {
    try {
      const data = await this.groupService.getStudentRequested(this.student.group.id).toPromise();
      this.request = data;
      this.filterRequest = data
      console.log(data);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  }

  async onAccept(element: any): Promise<void> {
    if(this.student.group.studentList.length >= 3) {
      this.Message = "Your group is full!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }

    if(element.student.group != null || element.student.group != undefined) {
      this.Message = "Student is already in the group!";
      setTimeout(() => {
        this.closeError();
      }, 4000);
      return;
    }

    try {
      await this.groupService.approveRequest({
        group: {
          student: {
            id: this.student.id
          },
          id: this.student.group.id
        },
        requestId: element.requestId,
        student: {
          id: element.student.id
        }
      }).toPromise();
      this.dialogRef.close();
    } catch(error) {
      console.log("Error while accepting the request : " + error);
      this.dialogRef.close();
    }
  }

  async onReject(element: any): Promise<void> {
    try {
      await this.groupService.rejectRequest({
        group: {
          student: {
            id: this.student.id
          },
          id: this.student.group.id
        },
        requestId: element.requestId,
        student: {
          id: element.student.id
        }
      }).toPromise();
      this.dialogRef.close();
    } catch(error) {
      console.log("Error while rejecting the request : " + error);
      this.dialogRef.close();
    }
  }

  closeError() {
    this.Message = undefined;
  }
}
