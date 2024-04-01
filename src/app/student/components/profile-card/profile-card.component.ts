import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
  @Input() imageSrc: string = "../../../assets/profile-student.png";
  @Input() name: string;
  @Input() department: string = "Computer";
}
