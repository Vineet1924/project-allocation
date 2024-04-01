import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private http: HttpClient
  ) { }
  
  getAll(): Observable<any> {
    const url = 'http://localhost:8080/api/project';
    return this.http.get<any>(url);
  }

  project(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/project'
    return this.http.post<any>(url, {
      name: data.name,
      description: data.description
    });
  }

  customProject(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/project/custom/' + data.id;
    return this.http.post<any>(url, {
      name: data.name,
      description: data.desc
    });
  }

  getProjectChoice(groupId: any): Observable<any> {
    const url = 'http://localhost:8080/api/projectChoice/' + groupId;
    return this.http.get<any>(url);
  }

  saveProjectChoice(groupId: string, studentId: string, projectId: string): Observable<any> {
    const url = 'http://localhost:8080/api/projectChoice/' + groupId + '/' + studentId + '/' + projectId;
    return this.http.post<any>(url, {});
  }

  changePriority(groupId: string, projectId: string, priority: number): Observable<any> {
    const url = 'http://localhost:8080/api/projectChoice/changePriority/' + groupId + '/' + projectId + '/' + priority;
    return this.http.post<any>(url, {});
  }

  removeProjectChoice(projectId: string, groupId: string) {
    const url = "http://localhost:8080/api/projectChoice/delete/" + projectId + "/" + groupId;
    return this.http.delete<any>(url);
  }
}
