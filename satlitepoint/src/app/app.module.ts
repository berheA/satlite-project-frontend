import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SatInfoComponent } from './components/sat-info/sat-info.component';
import { SatListComponent } from './components/sat-list/sat-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentCardsComponent } from './components/comment-cards/comment-cards.component';
import { FilterComponent } from './components/filter/filter.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component'
import { MyInterceptor } from './services/http-interceptor.service';
import { ExternalPanelComponent } from './components/external-panel/external-panel.component';
import { ExternalngTemplateComponent } from './components/externalng-template/externalng-template.component';
import { AuthenticationService } from './services/authentication.service';
import { RecentlyAddedComponent } from './components/recently-added/recently-added.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ProfileComponent,
    SatInfoComponent,
    SatListComponent,
    NavBarComponent,
    RegisterComponent,
    PageNotFoundComponent,
    CommentsComponent,
    CommentCardsComponent,
    FilterComponent,
    UserFavoritesComponent,
    ExternalPanelComponent,
    ExternalngTemplateComponent,
    RecentlyAddedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
