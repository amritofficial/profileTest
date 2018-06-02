import { Routes } from "@angular/router";
import { LoginComponent } from "./home/login/login.component";
import { SignUpComponent } from "./home/sign-up/sign-up.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, outlet: 'form-outlet'},
    {path: 'register', component: SignUpComponent, outlet: 'form-outlet'},
    {path: 'dashboard', component: DashboardComponent}
]