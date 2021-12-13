import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { PostMessageComponent } from './components/post-message/post-message.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbUserModule, NbIconModule, NbFormFieldModule, NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbPopoverModule, NbContextMenuModule, NbMenuModule, NbMenuService, NbMenuItem, NbActionComponent, NbActionsModule, NbAlertModule} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppRoutingModule } from './app-routing.module';
import { ViewMessageComponent } from './components/view-message/view-message.component';
import { AuthComponent } from './components/login/auth.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewSingleComponent } from './components/view-single/view-single.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { MessageComponent } from './components/message/message.component';
import { SingleMessageComponent } from './components/single-message/single-message.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ViewMessageComponent,
    PostMessageComponent,
    AuthComponent,
    SignUpComponent,
    ViewSingleComponent,
    MessageComponent,
    SingleMessageComponent,
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
    NbPopoverModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    ReactiveFormsModule,
    NbAlertModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    PostService,NbMenuItem, UserService, AuthService, AuthGuard, NbMenuService, NbMenuItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
