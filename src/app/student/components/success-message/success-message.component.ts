import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.css'
})
export class SuccessMessageComponent {
  @Input() Message = undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.closeError();
    }, 7000);
  }

  closeError() {
    this.Message = undefined;
  }
}
