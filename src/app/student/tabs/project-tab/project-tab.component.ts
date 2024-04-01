import { Component } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from '../../components/project-modal/project-modal.component';

@Component({
  selector: 'app-project-tab',
  templateUrl: './project-tab.component.html',
  styleUrl: './project-tab.component.css'
})
export class ProjectTabComponent {
  displayedColumns: string[] = ['no', 'project_id', 'name'];
  dataSource: any[];
  filterProject: any[];
  filter: string = 'name';

  constructor(
    private projectService: ProjectService, 
    private dailog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProject();
  }

  async loadProject(): Promise<void> {
    this.projectService.getAll().subscribe(
      (data) => {
        this.dataSource = data;
        this.filterProject = data;
      }
    );
  }

  openModal(rowData: any): void {
    const dialogRef = this.dailog.open(ProjectModalComponent, {
      width: '500px',
      height: '380px',
      data: rowData,
    });

    console.log(rowData);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("dailog closed");
      console.log(result);
    });
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
}
