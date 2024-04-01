import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../service/profile.service';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrl: './create-group-modal.component.css',
})
export class CreateGroupModalComponent {
  groupName: string = '';
  student: any;
  customErrorMessage: string = undefined;
  year: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<CreateGroupModalComponent>
  ) {}

  async onCreate() {
    this.customErrorMessage = undefined;

    if (this.groupName === '') {
      this.customErrorMessage = 'Enter Group Name';
      return;
    }

    await this.getStoredCookie();
    this.year = new Date().getFullYear();

    try {
      const response = await this.groupService
        .createGroup({
          groupName: this.groupName,
          student: this.student,
          year: this.year,
        })
        .toPromise();

      this.dialogRef.close({
        status: true,
        message: 'Group created successfully!!!',
        student: this.student,
      });
    } catch (error) {
      await this.loadProfile(this.student.user.id);

      this.dialogRef.close({
        status: true,
        message: 'Group created successfully!!!',
        student: this.student,
      });
    }
  }

  async getStoredCookie(): Promise<any> {
    await this.loadProfile(localStorage.getItem('id'));
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
