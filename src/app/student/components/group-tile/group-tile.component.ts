import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrl: './group-tile.component.css'
})
export class GroupTileComponent {
  @Input() title: string = '';
  @Input() value: string = '';
}
