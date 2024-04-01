import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  constructor(private http: HttpClient) { }

  getAllGroup(): Observable<any> {
    const url = 'http://localhost:8080/api/group';
    return this.http.get<any>(url);
  }

  createGroup(data: any): Observable<any> {
    console.log(data);
    const url = 'http://localhost:8080/api/group/createGroup/' + data.student.id;
    return this.http.post(url, {
      groupName: data.groupName,
      year: data.year
    });
  }

  getGroup(gid: string): Observable<any> {
    const url = 'http://localhost:8080/api/group/' + gid;
    return this.http.get<any>(url);
  }

  leaveGroup(studentId: string, groupId: string): Observable<any> {
    const url = 'http://localhost:8080/api/group/leaveGroup/' + studentId + '/' + groupId;
    return this.http.post<any>(url, {});
  }

  sendRequest(studentId: string, groupId: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + studentId + '/' + groupId;
    return this.http.post<any>(url, {});
  }

  sendRequestByStudent(studentId: string, groupId: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/send/' + studentId + '/' + groupId;
    return this.http.post<any>(url, {});
  }

  getStudentRequested(groupId: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/group/studentRequested/'+ groupId;
    return this.http.get<any>(url, {});
  }

  getStudentRequest(student_id: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/student/' + student_id;
    return this.http.get<any>(url);
  }

  removeMember(studentId: string, groupId: string) {
    const url = 'http://localhost:8080/api/group/leaveGroup/' + studentId + '/' + groupId;
    return this.http.post<any>(url, {});
  }

  getGroupRequest(group_id: string): Observable<any> {
    const url = 'http://localhost:8080/api/request/group/' + group_id;
    return this.http.get<any>(url);
  }

  approveRequest(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + data.group.student.id + '/' + data.requestId + '/approve/' + data.group.id + '/' + data.student.id;
    return this.http.post<any>(url, {});
  }

  rejectRequest(data: any): Observable<any> {
    const url = 'http://localhost:8080/api/request/' + data.group.student.id + '/' + data.requestId + '/reject/' + data.group.id + '/' + data.student.id;
    return this.http.post<any>(url, {});
  }
}
