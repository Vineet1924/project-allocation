import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() imageSrc: string = "../../../assets/profile-student.png";
  @Input() name: string;
  @Input() specialization: string = "Computer";
  @Input() rollNumber: string = undefined;

  constructor(

  ) { }
}
