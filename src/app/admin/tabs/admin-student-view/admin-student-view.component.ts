import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminResultPopupComponent } from '../../components/admin-result-popup/admin-result-popup.component';

@Component({
  selector: 'app-admin-student-view',
  templateUrl: './admin-student-view.component.html',
  styleUrl: './admin-student-view.component.css',
})
export class AdminStudentViewComponent implements OnInit {
  @Input() student: any = {};
  ngOnInit(): void {
    console.log(this.student);
  }
  constructor(private dialog: MatDialog) {}

  @Output() dataEvent = new EventEmitter<boolean>();

  sendDataToParent() {
    this.dataEvent.emit(false);
  }


  openDialog(semNo: number): void {
    const dialogRef = this.dialog.open(AdminResultPopupComponent, {
      data: { semNo: semNo, student: this.student },
      width: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  formatPhoneNumber(phone: string): string {
    if (phone && phone.length === 10) {
      return `${phone.slice(0, 5)} ${phone.slice(5)}`;
    }
    return phone;
  }

  protected readonly open = open;
}
