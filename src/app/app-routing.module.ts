import { Routes } from "@angular/router";
import { LoginComponent } from "./home/login/login.component";
import { SignUpComponent } from "./home/sign-up/sign-up.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { FindLinkComponent } from "./find-link/find-link.component";

export const appRoutes: Routes = [
    {path: '', redirectTo: '/home/(form-outlet:login)', pathMatch: 'full'},
    {path: 'home', component: HomeComponent,
        children: [
            {path: 'login', component: LoginComponent, outlet: 'form-outlet'},
            {path: 'register', component: SignUpComponent, outlet: 'form-outlet'}
            ]},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'find', component: FindLinkComponent}
]