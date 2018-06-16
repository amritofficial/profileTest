import { Routes } from "@angular/router";
import { LoginComponent } from "./home/login/login.component";
import { SignUpComponent } from "./home/sign-up/sign-up.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";

export const appRoutes: Routes = [
    {path: '', redirectTo: '/(main-outlet:home)', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, outlet: 'main-outlet',
        children: [
            {path: 'login', component: LoginComponent, outlet: 'form-outlet'},
            {path: 'register', component: SignUpComponent, outlet: 'form-outlet'}
            ]},
    {path: 'dashboard', component: DashboardComponent, outlet: 'main-outlet'},
    {path: 'profile', component: ProfileComponent, outlet: 'main-outlet'}
]