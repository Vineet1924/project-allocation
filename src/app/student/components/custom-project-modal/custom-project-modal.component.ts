import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-custom-project-modal',
  templateUrl: './custom-project-modal.component.html',
  styleUrl: './custom-project-modal.component.css'
})
export class CustomProjectModalComponent {
  titleRequired: string = '';
  descRequired: string = '';
  group_id: string = '';
  Message: string = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<CustomProjectModalComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.group_id = this.data;
  }

  async onSave() {
    if (this.titleRequired == '') {
      this.titleRequired = undefined;
    } else if (this.descRequired == '') {
      this.descRequired = undefined;
    } else {
      try {
        this.projectService.customProject({
          'id': this.group_id,
          'name': this.titleRequired,
          'desc': this.descRequired,
        }).toPromise();
        this.Message = "Custom-Project added!";
        setTimeout(() => {
          this.Message = undefined;
        }, 7000);
      } catch(error) {
        this.Message = "Custom-Project added!";
        setTimeout(() => {
          this.Message = undefined;
        }, 7000);
        console.log("Error while adding the project : " + error);
      }
      this.dialogRef.close();
    }
  }
}
