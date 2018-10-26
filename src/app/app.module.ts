import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from  'angular2-fontawesome/angular2-fontawesome'

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { GetBgService } from './services/get-bg.service';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { FeedComponent } from './feed/feed.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: AuthPageComponent },
  { path: 'browse', component: HomePageComponent },
  { path: 'feed', canActivate: [AuthGuardService], component:   FeedComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    FeedComponent,
    AuthPageComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    ReactiveFormsModule,
    Angular2FontawesomeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GetBgService, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
