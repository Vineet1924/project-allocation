import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flow-tile',
  templateUrl: './flow-tile.component.html',
  styleUrl: './flow-tile.component.css'
})
export class FlowTileComponent {
  @Input() no: number;
  @Input() title: string;
  @Input() description: string;
}
