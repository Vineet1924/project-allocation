import { Injectable } from '@angular/core';
import { Student } from '../interface/student';
import { ProfileService } from './profile.service';
import { Group } from '../interface/group';
import { GroupService } from './group.service';
import { Project } from '../interface/project';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(
    private profile_service: ProfileService,
    private group_service: GroupService,
    private project_Service: ProjectService,
  ) { }

  private create_student(data: any): Student {
    return {
      name: data.name,
      id: data.id,
      studentId: data.studentId,
      rollNumber: data.rollNumber,
      year: data.year,
      user: {
        email: data.user.email,
        password: data.user.password,
        type: data.user.type
      },
      result_list: data.resultList,
      phone: data.phone,
      group: data.group
    }
  }

  private create_group(data: any): Group {
    return {
      id: data.id,
      name: data.groupName,
      student: data.student,
      year: data.year,
      rank: data.rank,
      studentList: data.studentList,
      project: data.project
    }
  }

  private create_project(data: any): Project {
    return {
      id: data.id,
      name: data.name,
      description: data.description
    }
  }

  async load_profile(id: string): Promise<Student> {
    try {
      const student = await this.profile_service.getProfile(id).toPromise();
      return this.create_student(student);
    } catch (error) {
      console.log("Error while loading profile : " + error);
      return null;
    }
  }

  async load_students(): Promise<Student[]> {
    try {
      const studentsData = await this.profile_service.getAll().toPromise();
      return studentsData.map(data => this.create_student(data));
    } catch (error) {
      console.log("Error while loading students : " + error);
      return [];
    }
  }

  async load_group(id: string): Promise<Group> {
    try {
      const group = await this.group_service.getGroup(id).toPromise();
      return this.create_group(group);
    } catch (error) {
      console.log("Error while loading group : " + error);
      return null;
    }
  }

  async load_project_choice(id: string): Promise<Project[]> {
    try {
      const project_choices = await this.project_Service.getProjectChoice(id).toPromise();
      project_choices.sort((a, b) => a.priority - b.priority);
      console.log(project_choices);
      return project_choices.map(data => this.create_project(data.projects));
    } catch (error) {
      console.log("Error while loading project choice : " + error);
      return null;
    }
  }
}
