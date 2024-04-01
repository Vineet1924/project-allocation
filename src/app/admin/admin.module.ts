import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdminRoutingModule } from './admin-routing.component';
import { AddFacultiesComponent } from './tabs/add-faculties/add-faculties.component';
import { AddStudentsComponent } from './tabs/add-students/add-students.component';
import { AddUsersComponent } from './tabs/add-users/add-users.component';
import { AdminDasboardTabComponent } from './tabs/admin-dasboard-tab/admin-dasboard-tab.component';
import { AdminStudentViewComponent } from './tabs/admin-student-view/admin-student-view.component';
import { CommunicationComponent } from './tabs/communication/communication.component';
import { ManageFacultyComponent } from './tabs/manage-faculty/manage-faculty.component';
import { PhaseControlComponent } from './tabs/phase-control/phase-control.component';
import { AdminComponent } from './admin.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AdminFacultyCardComponent } from './components/admin-faculty-card/admin-faculty-card.component';
import { AdminResultPopupComponent } from './components/admin-result-popup/admin-result-popup.component';
import { FacultyPopupComponent } from './components/faculty-popup/faculty-popup.component';
import { LoginServiceService } from '../authentication/service/login-service.service';

@NgModule({
  declarations: [
    AddFacultiesComponent,
    AddStudentsComponent,
    AddUsersComponent,
    AdminDasboardTabComponent,
    AdminStudentViewComponent,
    CommunicationComponent,
    ManageFacultyComponent,
    PhaseControlComponent,
    AdminComponent,
    AdminFacultyCardComponent,
    AdminResultPopupComponent,
    FacultyPopupComponent,
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    EditorModule,
  ],
  bootstrap: [AdminModule],
})
export class AdminModule {}
