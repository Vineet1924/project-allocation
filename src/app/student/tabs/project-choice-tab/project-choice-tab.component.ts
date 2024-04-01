import { Component, Input } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { GroupService } from '../../service/group.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../../service/profile.service';
import { CustomProjectModalComponent } from '../../components/custom-project-modal/custom-project-modal.component';
import { Student } from '../../interface/student';
import { Group } from '../../interface/group';

@Component({
  selector: 'app-project-choice-tab',
  templateUrl: './project-choice-tab.component.html',
  styleUrl: './project-choice-tab.component.css'
})
export class ProjectChoiceTabComponent {
  @Input() student : Student;
  group: Group;
  errorMessage: string = undefined;
  successMessage: string = undefined;
  displayedColumns: string[] = ['no', 'project_id', 'name', 'actions'];
  dataSource: any[];
  projectChoices: any[];
  filterProject: any[];

  constructor(
    private projectService: ProjectService,
    private groupService: GroupService,
    private dailog: MatDialog,
    private profileService: ProfileService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadProfile(this.student.id);
    await this.loadProject();
    await this.loadGroup();
    await this.loadProjectChoice();
  }

  async loadProfile(uid: string): Promise<void> {
    try {
      const data = await this.profileService.getProfile(uid).toPromise();
      this.student = data;
      console.log(data);
    } catch (error) {
      console.log("Error while loading the profile : " + error);
    }
  }

  async loadProject(): Promise<void> {
    try {
      const data = await this.projectService.getAll().toPromise();
      this.dataSource = data;
      this.filterProject = data;
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

  searchProjects(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchText) {
      this.filterProject = this.dataSource;
      return;
    }

    const searchResults = this.dataSource.filter(project =>
      project.name.toString().toLowerCase().includes(searchText) ||
      project.id.toString().toLowerCase().includes(searchText)
    );

    this.filterProject = [...searchResults];
  }

  async loadProjectChoice() {
    try {
      const data = await this.projectService.getProjectChoice(this.group.id).toPromise().then((data) => {
        this.projectChoices = data.sort((a, b) => a.priority - b.priority);
        console.log(this.projectChoices);
      });
    } catch (error) {
      console.log("Error while loading choices : " + error);
    }
  }

  async addChoice(element: any) {
    const choiceExists = this.projectChoices.some(choice => choice.projects.id === element.id);
    if (choiceExists) {
      this.errorMessage = "Choice already exists";
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
      return;
    }

    try {
      const data = await this.projectService.saveProjectChoice(this.group.id, this.student.id, element.id).toPromise();
    } catch (error) {
      console.log("Error while saving choice : " + error);
      this.successMessage = "Project choice added";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadProjectChoice();
    }
  }

  async removeChoice(element: any) {
    try {
      const data = await this.projectService.removeProjectChoice(element.projects.id, this.group.id).toPromise();
    } catch (error) {
      console.log("Error while removing choice : " + error);
      this.successMessage = "Project choice removed";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadProjectChoice();
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
      await this.projectService.changePriority(this.group.id, element.projects.id, index).toPromise();
    } catch (error) {
      this.successMessage = "Priority changed!";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadProjectChoice();
      return;
    }
  }

  async decrementPriority(index: number, element: any) {
    if (index === this.projectChoices.length - 1) {
      this.errorMessage = "Already the lowest priority";
      setTimeout(() => {
        this.errorMessage = undefined;
      }, 7000);
      return;
    }
    try {
      await this.projectService.changePriority(this.group.id, element.projects.id, index + 2).toPromise();
    } catch (error) {
      this.successMessage = "Priority changed!";
      setTimeout(() => {
        this.successMessage = undefined;
      }, 7000);
      await this.loadProjectChoice();
      return;
    }
  }

  openCustomProjectModal(): void {
    const dialogRef = this.dailog.open(CustomProjectModalComponent, {
      width: '400px',
      height: '330px',
      data: this.group.id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadProject();
    });
  }
}
