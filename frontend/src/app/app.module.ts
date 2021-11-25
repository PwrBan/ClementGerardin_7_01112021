import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { PostMessageComponent } from './components/post-message/post-message.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbUserModule, NbIconModule, NbFormFieldModule, NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { AuthComponent } from './components/login/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewSingleComponent } from './components/view-single/view-single.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ViewMessageComponent,
    PostMessageComponent,
    AuthComponent,
    SignUpComponent,
    ViewSingleComponent,
  ],
  imports: [
    HttpClientModule,
    NbEvaIconsModule,
    NbUserModule,
    NbIconModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default'}),
    NbLayoutModule,
    NbCardModule,
    AppRoutingModule,
    NbButtonModule,
    RouterModule,
    NbInputModule,
    NbFormFieldModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    PostService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
