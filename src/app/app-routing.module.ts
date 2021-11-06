import { NgModule } from '@angular/core';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { AppComponent } from './app.component';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'view', component: ViewMessageComponent },
  {path: 'post', component: PostMessageComponent},
  {path: '', component: ViewMessageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
