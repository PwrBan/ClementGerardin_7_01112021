import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { PostMessageComponent } from './components/post-message/post-message.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbLayoutDirection} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ViewMessageComponent } from './components/view-message/view-message.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ViewMessageComponent,
    PostMessageComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    AppRoutingModule,
    NbButtonModule,
    RouterModule,
    NbInputModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
