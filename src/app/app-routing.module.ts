import { Routes } from "@angular/router";
import { LoginComponent } from "./home/login/login.component";
import { SignUpComponent } from "./home/sign-up/sign-up.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { DevfinderPortalComponent } from "./devfinder-portal/devfinder-portal.component";
import { MessengerComponent } from "./messenger/messenger.component";
import { MessengerUsersResolver } from "./shared/resolvers/messenger-users.resolver";
import { ProfileEducationComponent } from "./profile/profile-education/profile-education.component";
import { ProfileWorkExperienceComponent } from "./profile/profile-work-experience/profile-work-experience.component";
import { GuestProfileComponent } from "./guest-profile/guest-profile.component";
import { GuestProfileEducationComponent } from "./guest-profile/guest-profile-education/guest-profile-education.component";
import { GuestProfileWorkExperienceComponent } from "./guest-profile/guest-profile-work-experience/guest-profile-work-experience.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home/(form-outlet:login)', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'login', component: LoginComponent, outlet: 'form-outlet' },
            { path: 'register', component: SignUpComponent, outlet: 'form-outlet' }
        ]
    },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'messenger', component: MessengerComponent
    },
    {
        path: 'profile', component: ProfileComponent,
        children: [
            { path: '', redirectTo: 'timeline', pathMatch: 'full' },
            { path: 'timeline', component: ProfileComponent },
            { path: 'education', component: ProfileEducationComponent },
            { path: 'work-experience', component: ProfileWorkExperienceComponent }
        ]
    },
    { path: 'devfinder-portal', component: DevfinderPortalComponent },
    {
        path: 'guest-profile/:guestId', component: GuestProfileComponent,
        children: [
            { path: '', redirectTo: 'timeline', pathMatch: "full"},
            { path: 'timeline', component: GuestProfileComponent},
            { path: 'education', component: GuestProfileEducationComponent},
            { path: 'work-experience', component: GuestProfileWorkExperienceComponent}
        ]
    }
]