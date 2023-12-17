import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login/login.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AuthGuard } from "./services/auth-guard.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SignupPageComponent } from "./signup/signup.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
