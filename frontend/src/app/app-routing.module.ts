import { NgModule } from '@angular/core';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/login/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { SingleMessageComponent } from './components/single-message/single-message.component';

const routes: Routes = [
  {path: 'view',canActivate: [AuthGuard], component: ViewMessageComponent },
  {path: 'view/:id',canActivate: [AuthGuard], component: SingleMessageComponent},
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
