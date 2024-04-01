import { Component, Input } from '@angular/core';
import { Student } from '../../interface/student';
import { Group } from '../../interface/group';
import { ProjectService } from '../../service/project.service';
import { GroupService } from '../../service/group.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../../service/profile.service';
import { CustomProjectModalComponent } from '../../components/custom-project-modal/custom-project-modal.component';
import { FacultyService } from '../../service/faculty.service';
import { Faculty } from '../../interface/faculty';
import { UtilService } from '../../service/util.service';

@Component({
  selector: 'app-faculty-choice-tab',
  templateUrl: './faculty-choice-tab.component.html',
  styleUrl: './faculty-choice-tab.component.css'
})
export class FacultyChoiceTabComponent {
  @Input() student: Student;
  group: Group;
  errorMessage: string = undefined;
  successMessage: string = undefined;
  displayedColumns: string[] = ['no', 'project_id', 'name', 'actions'];
  dataSource: Faculty[];
  facultyChoices: any[] = [];
  filterFaculty: any[];

  constructor(
    private projectService: ProjectService,
    private groupService: GroupService,
    private profileService: ProfileService,
    private facultySerivce: FacultyService,
    private util_service: UtilService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getStoredCookie();
    await this.loadFaculty();
    await this.loadGroup();
    await this.loadFacultyChoice();
  }

  async getStoredCookie(): Promise<any> {
    this.student = await this.util_service.load_profile(
      localStorage.getItem('id')
    );
  }

  async loadFaculty(): Promise<void> {
    try {
      const data = await this.facultySerivce.getAllFaculties().toPromise();
      this.dataSource = data;
      this.filterFaculty = data;
      console.log(data);
    } catch (error) {
      console.log("Error while loading the profile : " + error);
    }
  }

  async loadGroup() {
    try {
      const data = await this.groupService.getGroup(this.student.group.id).toPromise();
      this.group = data;
    } catch (error) {
      console.log("Error while loading group : " + error);
    }
  }

  searchFaculties(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterFaculty = this.dataSource;
      return;
    }

    const searchResults = this.dataSource.filter(faculty =>
      faculty.name.toString().toLowerCase().includes(searchText) ||
      faculty.id.toString().toLowerCase().includes(searchText)
    );

    this.filterFaculty = [...searchResults];
  }

  async loadFacultyChoice() {
    try {
      console.log("Called");
      console.log(this.group.id);
      const data = await this.facultySerivce.getAllFacultyChoices(this.group.id).toPromise();
      console.log(data);
      if (data !== null) {
        this.facultyChoices = data.sort((a, b) => a.priority - b.priority);
        console.log(this.facultyChoices);
      } else {
        console.log("No data received from the server");
      }
    } catch (error) {
      console.log("Error while loading choices : " + error);
    }
  }


  async addChoice(element: any) {
    console.log(element);
    const choiceExists = this.facultyChoices.some(choice => choice.faculty.id == element.id);
    if (choiceExists) {
      this.errorMessage = "Choice already exists";
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
      return;
    }

    try {
      const data = await this.facultySerivce.saveFacultyChoice(this.group.id, element.id).toPromise();
      this.successMessage = "Faculty choice added";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadFacultyChoice();
    } catch (error) {
      console.log("Error while saving choice : " + error);
      await this.loadFacultyChoice();
    }
  }

  async removeChoice(element: any) {
    try {
      console.log(element.id);
      const data = await this.facultySerivce.removeFacultyChoice(element.faculty.id, this.group.id).toPromise();
      this.successMessage = "Faculty choice removed";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadFacultyChoice();
    } catch (error) {
      console.log("Error while removing choice : " + error);
    }
  }

  async incrementPriority(index: number, element: any) {
    if (index === 0) {
      this.errorMessage = "Already the highest priority";
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
      return;
    }

    try {
      console.log(element);
      await this.facultySerivce.changePriority(this.group.id, element.faculty.id, index).toPromise();
      this.successMessage = "Priority changed!";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadFacultyChoice();
    } catch (error) {
      console.log("Error while changing priority : " + error);
      await this.loadFacultyChoice();
      return;
    }
  }

  async decrementPriority(index: number, element: any) {
    if (index === this.facultyChoices.length - 1) {
      this.errorMessage = "Already the lowest priority";
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
      return;
    }
    try {
      await this.facultySerivce.changePriority(this.group.id, element.faculty.id, index + 2).toPromise();
      this.successMessage = "Priority changed!";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadFacultyChoice();
    } catch (error) {
      console.log("Error while changing priority : " + error);
      await this.loadFacultyChoice();
      return;
    }
  }
}
