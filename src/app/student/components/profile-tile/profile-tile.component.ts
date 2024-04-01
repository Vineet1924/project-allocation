import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-tile',
  templateUrl: './profile-tile.component.html',
  styleUrl: './profile-tile.component.css'
})
export class ProfileTileComponent {
  @Input() title: string = '';
  @Input() value: string = '';
}
