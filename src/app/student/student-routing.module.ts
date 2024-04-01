import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { AuthGuard } from '../authentication/service/auth.guard';
import { HomeTabComponent } from './tabs/home-tab/home-tab.component';
import { GroupTabComponent } from './tabs/group-tab/group-tab.component';
import { JoinGroupTabComponent } from './tabs/join-group-tab/join-group-tab.component';
import { ProjectTabComponent } from './tabs/project-tab/project-tab.component';
import { ProjectChoiceTabComponent } from './tabs/project-choice-tab/project-choice-tab.component';
import { RemoveMemberTabComponent } from './tabs/remove-member-tab/remove-member-tab.component';
import { SendRequestTabComponent } from './tabs/send-request-tab/send-request-tab.component';
import { FacultyChoiceTabComponent } from './tabs/faculty-choice-tab/faculty-choice-tab.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: 'home',
        component: HomeTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'group',
        component: GroupTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'joinGroup',
        component: JoinGroupTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'project',
        component: ProjectTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'projectChoice',
        component: ProjectChoiceTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'removeMember',
        component: RemoveMemberTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'sendRequest',
        component: SendRequestTabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'facultyChoice',
        component: FacultyChoiceTabComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
