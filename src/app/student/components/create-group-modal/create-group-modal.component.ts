import { Component, ViewChild, Inject } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { GroupServiceService } from '../../service/group-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.css'
})
export class CreateGroupModalComponent {
  groupName: string = "";
  student: any;
  customErrorMessage: string = undefined;
  year: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profileService: ProfileService, private groupService: GroupServiceService, private dialogRef: MatDialogRef<CreateGroupModalComponent>,
  ) { }

  async onCreate() {
    this.customErrorMessage = undefined;

    if (this.groupName === "") {
      this.customErrorMessage = 'Enter Group Name';
      return;
    }

    this.year = new Date().getFullYear();

    try {
      const response = await this.groupService.createGroup({
        "groupName": this.groupName,
        "student": this.student,
        "year": this.year
      }).toPromise();

      console.log('Group created successfully:', response);

      this.dialogRef.close({
        "status": true,
        "message": "Group created successfully!!!",
        "student": this.student
      });
    } catch (error) {
      console.error('Error creating group:', error);

      await this.loadProfile(this.student.user.id);

      this.dialogRef.close({
        "status": true,
        "message": "Group created successfully!!!",
        "student": this.student
      });
    }
  }


 

  async loadProfile(uid: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.profileService.getProfile(uid).subscribe(
        (data) => {
          this.student = data;
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
