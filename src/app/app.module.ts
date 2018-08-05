import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatSidenavModule, MatCardModule } from '@angular/material';


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
    DevfinderPortalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAzjU733dsOZlolvqWbhbs3MntDcf3oQXg'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
