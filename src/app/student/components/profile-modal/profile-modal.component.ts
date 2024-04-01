import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../interface/student';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.css'
})

export class ProfileModalComponent {
  studentName: string;
  studentId: string;
  email: string
  phoneNo: string;
  resultList: any[];
  semester: string
  cpi: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Student) { }

  ngOnInit(): void {
    this.studentName = this.data.name;
    this.studentId = this.data.rollNumber;
    this.email = this.data.user.email;
    this.phoneNo = this.data.phone;
    this.resultList = this.data.result_list;
    this.semester = this.resultList[this.resultList.length - 1].semNo;
    this.cpi = this.resultList[this.resultList.length - 1].cpi;
  }
}
