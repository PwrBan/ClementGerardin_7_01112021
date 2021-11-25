import { NgModule } from '@angular/core';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { AppComponent } from './app.component';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/login/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewSingleComponent } from './components/view-single/view-single.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'view', component: ViewMessageComponent },
  {path: 'view/:id', component: ViewSingleComponent},
  {path: 'post', canActivate: [AuthGuard], component: PostMessageComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: '', redirectTo: 'view', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
