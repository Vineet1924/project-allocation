import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateGroupModalComponent } from './components/create-group-modal/create-group-modal.component';
import { CustomProjectModalComponent } from './components/custom-project-modal/custom-project-modal.component';
import { FlowModalComponent } from './components/flow-modal/flow-modal.component';
import { FlowTileComponent } from './components/flow-tile/flow-tile.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { LottieAnimationComponent } from './components/lottie-animation/lottie-animation.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { ProjectModalComponent } from './components/project-modal/project-modal.component';
import { GroupTileComponent } from './components/group-tile/group-tile.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileTileComponent } from './components/profile-tile/profile-tile.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { HomeTabComponent } from './tabs/home-tab/home-tab.component';
import { ProjectTabComponent } from './tabs/project-tab/project-tab.component';
import { ProjectChoiceTabComponent } from './tabs/project-choice-tab/project-choice-tab.component';
import { RemoveMemberTabComponent } from './tabs/remove-member-tab/remove-member-tab.component';
import { SendRequestTabComponent } from './tabs/send-request-tab/send-request-tab.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { GroupRequestComponent } from './components/group-request/group-request.component';
import { FacultyChoiceTabComponent } from './tabs/faculty-choice-tab/faculty-choice-tab.component';
import { GroupTabComponent } from './tabs/group-tab/group-tab.component';
import { JoinGroupTabComponent } from './tabs/join-group-tab/join-group-tab.component';
import { AppModule } from '../app.module';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';

@NgModule({
  declarations: [
    StudentComponent,
    CustomButtonComponent,
    CreateGroupModalComponent,
    CustomProjectModalComponent,
    FlowModalComponent,
    FlowTileComponent,
    GroupCardComponent,
    LottieAnimationComponent,
    ProfileModalComponent,
    ProjectModalComponent,
    GroupTileComponent,
    MemberCardComponent,
    ProfileCardComponent,
    ProfileTileComponent,
    RequestCardComponent,
    RequestModalComponent,
    HomeTabComponent,
    ProjectTabComponent,
    ProjectChoiceTabComponent,
    RemoveMemberTabComponent,
    SendRequestTabComponent,
    GroupRequestComponent,
    FacultyChoiceTabComponent,
    GroupTabComponent,
    JoinGroupTabComponent,
    ProjectChoiceTabComponent,
    ProjectTabComponent,
    RemoveMemberTabComponent,
    SendRequestTabComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
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
    MatDialogModule,
    MatTableModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
})
export class StudentModule {}
