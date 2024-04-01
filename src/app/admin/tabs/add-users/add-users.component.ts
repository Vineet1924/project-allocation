import { Component } from '@angular/core';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
export class AddUsersComponent {
  selectedTab: string = 'tab1';

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
