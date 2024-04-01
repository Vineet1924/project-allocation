import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty.component';
import { HomeComponent } from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { AuthGuard } from '../authentication/service/auth.guard';

const routes: Routes = [
  {
    path: 'faculty',
    component: FacultyComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'groups/detail',
        component: GroupViewComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacultyRoutingModule {}
