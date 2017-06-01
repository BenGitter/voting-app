import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { PollService } from './services/poll.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ClipboardModule } from 'ngx-clipboard';

import { CreatedByPipe } from './created-by.pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyPollsComponent } from './components/my-polls/my-polls.component';
import { PollComponent } from './components/poll/poll.component';
import { PollThumbComponent } from './components/poll-thumb/poll-thumb.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';


const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "mypolls", component: MyPollsComponent, canActivate: [AuthGuard] },
  { path: "poll/:id", component: PollComponent },
  { path: "new-poll", component: NewPollComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    MyPollsComponent,
    PollComponent,
    PollThumbComponent,
    CreatedByPipe,
    NewPollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ChartsModule,
    ClipboardModule
  ],
  providers: [
    ValidateService,
    AuthService,
    PollService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
