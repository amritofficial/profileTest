import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { NgbModule, NgbModalModule, NgbDatepickerModule, NgbButtonsModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoadingModule } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule, HighlightOptions } from 'ngx-highlightjs';
import { NguiMapModule } from '@ngui/map';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './home/sign-up/sign-up.component';
import { LoginComponent } from './home/login/login.component';
import { appRoutes } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedComponent } from './dashboard/feed/feed.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileOptionComponent } from './profile/profile-option/profile-option.component';
import { ProfileThumbComponent } from './profile/profile-thumb/profile-thumb.component';
import { ProfileFeedComponent } from './profile/profile-feed/profile-feed.component';
import { ProfileIntroComponent } from './profile/profile-intro/profile-intro.component';
import { ProfileRightSidebarComponent } from './profile/profile-right-sidebar/profile-right-sidebar.component';
import { ProfileIntroEditComponent } from './profile/edit/profile-intro-edit/profile-intro-edit.component';
import { ProfileService } from './shared/services/profile.service';
import { DevfinderPortalComponent } from './devfinder-portal/devfinder-portal.component';
import { ResultCardComponent } from './devfinder-portal/result-card/result-card.component';
import { ProfileThumbEditComponent } from './profile/edit/profile-thumb-edit/profile-thumb-edit.component';
import { ImageCropperComponent } from 'ngx-img-cropper';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { MessengerComponent } from './messenger/messenger.component';
import { ParseService } from './shared/services/parse.service';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'environments/environment';
import { FirebaseService } from './shared/services/firebase.service';
import { MessengerUserCardComponent } from './messenger/messenger-user-card/messenger-user-card.component';
import { MessengerMessageBoxComponent } from './messenger/messenger-message-box/messenger-message-box.component';
import { MessengerUserOptionsComponent } from './messenger/messenger-user-options/messenger-user-options.component';
import { MessengerService } from './shared/services/messenger.service';
import { MessengerUsersResolver } from './shared/resolvers/messenger-users.resolver';
import { MainComponent } from './main/main.component';
import { UserListBarComponent } from './user-list-bar/user-list-bar.component';
import { ChatService } from './shared/services/chat.service';
import { UserService } from './shared/services/user.service';
import { ProfileEducationComponent } from './profile/profile-education/profile-education.component';
import { ProfileWorkExperienceComponent } from './profile/profile-work-experience/profile-work-experience.component';
import { GuestProfileComponent } from './guest-profile/guest-profile.component';
import { GuestProfileService } from './shared/services/guest-profile.service';
import { GuestProfileOptionsComponent } from './guest-profile/guest-profile-options/guest-profile-options.component';
import { GuestProfileIntroComponent } from './guest-profile/guest-profile-intro/guest-profile-intro.component';
import { GuestProfileThumbComponent } from './guest-profile/guest-profile-thumb/guest-profile-thumb.component';
import { GuestProfileEducationComponent } from './guest-profile/guest-profile-education/guest-profile-education.component';
import { GuestProfileWorkExperienceComponent } from './guest-profile/guest-profile-work-experience/guest-profile-work-experience.component';
import { GuestProfileFeedComponent } from './guest-profile/guest-profile-feed/guest-profile-feed.component';
import { GuestProfileRightSidebarComponent } from './guest-profile/guest-profile-right-sidebar/guest-profile-right-sidebar.component';
import { ProfileLocationModalComponent } from './profile/profile-location-modal/profile-location-modal.component';
import { LocationService } from './shared/services/location.service';
import { FinderTagsComponent } from './profile/finder-tags/finder-tags.component';
import { TagService } from './shared/services/tag.service';
import { GuestFinderTagsComponent } from './guest-profile/guest-finder-tags/guest-finder-tags.component';
import { LinkRequestCardComponent } from './navbar/link-request-card/link-request-card.component';
import { RequestService } from './shared/services/request.service';
import { LinkService } from './shared/services/link.service';
import { PostService } from './shared/services/post.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { ProfileLinksComponent } from './profile/profile-links/profile-links.component';
import { RouteService } from './shared/services/route.service';
import { DevfinderHomeComponent } from './devfinder-portal/devfinder-home/devfinder-home.component';
import { IssueCardComponent } from './devfinder-portal/devfinder-home/issue-card/issue-card.component';
import { DevfinderTagsComponent } from './devfinder-portal/devfinder-tags/devfinder-tags.component';
import { DevfinderDevelopersComponent } from './devfinder-portal/devfinder-developers/devfinder-developers.component';
import { TagComponent } from './devfinder-portal/devfinder-tags/tag/tag.component';
import { DeveloperComponent } from './devfinder-portal/devfinder-developers/developer/developer.component';
import { PortalService } from './shared/services/portal.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { GuestProfileLinksComponent } from './guest-profile/guest-profile-links/guest-profile-links.component';
import { QuestionThreadComponent } from './devfinder-portal/question-thread/question-thread.component';
import { OpenIssueComponent } from './devfinder-portal/open-issue/open-issue.component';
import { HeatMapComponent } from './devfinder-portal/heat-map/heat-map.component';
import { DistanceService } from './shared/services/distance.service';
import { TaggedQuestionsComponent } from './devfinder-portal/tagged-questions/tagged-questions.component';
import { IssueCardTaggedComponent } from './devfinder-portal/tagged-questions/issue-card-tagged/issue-card-tagged.component';
import { SearchService } from './shared/services/search.service';
import { LocationPipe } from './shared/pipes/location.pipe';
import { DevfinderActivityComponent } from './devfinder-activity/devfinder-activity.component';

const options: HighlightOptions = {
  theme: 'agate',
  path: 'assets/js/highlight-js'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SignUpComponent,
    LoginComponent,
    DashboardComponent,
    FeedComponent,
    NavbarComponent,
    ProfileOptionComponent,
    ProfileThumbComponent,
    ProfileFeedComponent,
    ProfileIntroComponent,
    ProfileRightSidebarComponent,
    ProfileIntroEditComponent,
    DevfinderPortalComponent,
    ResultCardComponent,
    ProfileThumbEditComponent,
    ImageCropperComponent,
    ChatBoxComponent,
    MessengerComponent,
    MessengerUserCardComponent,
    MessengerMessageBoxComponent,
    MessengerUserOptionsComponent,
    MainComponent,
    UserListBarComponent,
    ProfileEducationComponent,
    ProfileWorkExperienceComponent,
    GuestProfileComponent,
    GuestProfileOptionsComponent,
    GuestProfileIntroComponent,
    GuestProfileThumbComponent,
    GuestProfileEducationComponent,
    GuestProfileWorkExperienceComponent,
    GuestProfileFeedComponent,
    GuestProfileRightSidebarComponent,
    ProfileLocationModalComponent,
    FinderTagsComponent,
    GuestFinderTagsComponent,
    LinkRequestCardComponent,
    TimeAgoPipe,
    ProfileLinksComponent,
    DevfinderHomeComponent,
    IssueCardComponent,
    DevfinderTagsComponent,
    DevfinderDevelopersComponent,
    TagComponent,
    DeveloperComponent,
    GuestProfileLinksComponent,
    QuestionThreadComponent,
    OpenIssueComponent,
    HeatMapComponent,
    TaggedQuestionsComponent,
    IssueCardTaggedComponent,
    LocationPipe,
    DevfinderActivityComponent
  ],
  entryComponents: [ProfileThumbEditComponent, ProfileLocationModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    LoadingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCardModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    MatRadioModule,
    HighlightModule.forRoot({ theme: 'agate' }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzjU733dsOZlolvqWbhbs3MntDcf3oQXg'
    }),
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyAzjU733dsOZlolvqWbhbs3MntDcf3oQXg' +
        '&libraries=visualization',
    }),
    NgxPaginationModule,
    NgbDropdownModule,
    NgxChartsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [ProfileService, ParseService, AuthService, FirebaseService, MessengerService, MessengerUsersResolver, ChatService, UserService, GuestProfileService, LocationService, TagService, RequestService, LinkService, PostService, RouteService, PortalService, AuthGuard, DistanceService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
