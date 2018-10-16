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
import { ProfileLinksComponent } from "./profile/profile-links/profile-links.component";
import { DevfinderHomeComponent } from "./devfinder-portal/devfinder-home/devfinder-home.component";
import { DevfinderTagsComponent } from "./devfinder-portal/devfinder-tags/devfinder-tags.component";
import { DevfinderDevelopersComponent } from "./devfinder-portal/devfinder-developers/devfinder-developers.component";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { GuestProfileLinksComponent } from "./guest-profile/guest-profile-links/guest-profile-links.component";
import { QuestionThreadComponent } from "./devfinder-portal/question-thread/question-thread.component";
import { OpenIssueComponent } from "./devfinder-portal/open-issue/open-issue.component";
import { HeatMapComponent } from "./devfinder-portal/heat-map/heat-map.component";
import { TaggedQuestionsComponent } from "./devfinder-portal/tagged-questions/tagged-questions.component";

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home/(form-outlet:login)', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'login', component: LoginComponent, outlet: 'form-outlet' },
            { path: 'register', component: SignUpComponent, outlet: 'form-outlet' }
        ]
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {
        path: 'messenger', component: MessengerComponent, canActivate: [AuthGuard]
    },
    {
        path: 'profile', component: ProfileComponent, canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'timeline', pathMatch: 'full' },
            { path: 'timeline', component: ProfileComponent },
            { path: 'education', component: ProfileEducationComponent },
            { path: 'work-experience', component: ProfileWorkExperienceComponent },
            { path: 'links', component: ProfileLinksComponent }
        ]
    },
    {
        path: 'devfinder-portal', component: DevfinderPortalComponent, canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: DevfinderHomeComponent },
            { path: 'tags', component: DevfinderTagsComponent },
            { path: 'developers', component: DevfinderDevelopersComponent },
            { path: 'question/:issueId', component: QuestionThreadComponent },
            { path: 'open-issue', component: OpenIssueComponent },
            { path: 'dev-heat', component: HeatMapComponent },
            { path: 'questions/tagged/:tagName', component: TaggedQuestionsComponent }
        ]
    },
    {
        path: 'guest-profile/:guestId', component: GuestProfileComponent, canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'timeline', pathMatch: "full" },
            { path: 'timeline', component: GuestProfileComponent },
            { path: 'education', component: GuestProfileEducationComponent },
            { path: 'work-experience', component: GuestProfileWorkExperienceComponent },
            { path: 'links', component: GuestProfileLinksComponent }
        ]
    }
    // { path: '**', redirectTo: 'dashboard' }
]