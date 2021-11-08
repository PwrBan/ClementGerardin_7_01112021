import { NgModule } from '@angular/core';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { AppComponent } from './app.component';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';

const routes: Routes = [
  {path: 'view', component: ViewMessageComponent },
  {path: 'post', component: PostMessageComponent},
  {path: 'auth', component: AuthComponent},
  {path: '', component: ViewMessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
