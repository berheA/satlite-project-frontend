import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalPanelComponent } from './components/external-panel/external-panel.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component';
import { SatInfoComponent } from './components/sat-info/sat-info.component';
import { SatListComponent } from './components/sat-list/sat-list.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {path:"", component:LoginComponent, data:['login']},
  {path:"login",component:LoginComponent, data:['login']},
  {path:"profile", component:ProfileComponent, canActivate: [AuthenticationService], data:['profile']},
  {path:"sat-info", component:SatInfoComponent, canActivate: [AuthenticationService], data:['sat-info']},
  {path:"sat-list", component:SatListComponent, canActivate: [AuthenticationService], data:['sat-list']},
  {path:"homepage", component:HomePageComponent, canActivate: [AuthenticationService], data:['homepage']},
  {path:"favorites", component:UserFavoritesComponent, canActivate: [AuthenticationService], data:['favorites']},
  {path:"add", component:ExternalPanelComponent, canActivate: [AuthenticationService],},
  {path:"recent", component:RecentlyAddedComponent, canActivate: [AuthenticationService],},
  {path: '**', component:PageNotFoundComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
