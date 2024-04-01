import { Component } from '@angular/core';
import { FacultyService } from '../faculty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css',
})
export class GroupsComponent {
  facultyData: any = {};
  selectedOption: string = 'groupName';
  groupList: any[] = [];
  constructor(private facultyService: FacultyService, private router: Router) {
    this.getDataFromAPI();
  }
  // src/app/dropdown-options.ts
  dropdownOptions = [
    'Group',
    'Project',
    'Technology',
    // Add more options as needed
  ];

  options = this.dropdownOptions;

  onSelect(option: string): void {
    this.selectedOption = option; // Update selected option
  }
  getDataFromAPI() {
    this.facultyService
      .getData(localStorage.getItem('email'))
      .subscribe((data) => {
        this.facultyData = data;
        console.log(this.facultyData);
        this.groupList = this.facultyData.groupList;
      });
  }

  filterProducts(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    console.log(searchTerm);

    this.groupList = this.facultyData.groupList.filter((product) => {
      const studentMatch = product.studentList.some((student) => {
        return student.rollNumber === searchTerm;
      });

      return (
        product.project.name.toLowerCase().includes(searchTerm) ||
        product.groupName.toString().toLowerCase().includes(searchTerm) ||
        studentMatch
      );
    });
  }

  groupView() {
    window.location.href = '/faculty/groups/detail';
  }
}
