import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.css'
})
export class CustomButtonComponent {
  @Input() buttonText: string = 'Custom-Button';
  @Input() imageUrl: string = '';
  @Input() type: string = 'submit';
}
