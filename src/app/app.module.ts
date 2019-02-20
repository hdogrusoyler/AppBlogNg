import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarAdminComponent } from './navbar/navbar-admin/navbar-admin.component';
import { ContentComponent } from './content/content.component';
import { ContentAddComponent } from './content/content-add/content-add.component';
import { ContentEditComponent } from './content/content-edit/content-edit.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';
import { ValueComponent } from './value/value.component';
import { ValueDetailComponent } from './value/value-detail/value-detail.component';
import { PhotoComponent } from './photo/photo.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { LoginInterceptor } from './login/login.interceptor';
import { MessageComponent } from './message/message.component';
import { MessageGetComponent } from './message/message-get/message-get.component';
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      NavbarAdminComponent,
      ValueComponent,
      ValueDetailComponent,
      ContentComponent,
      ContentDetailComponent,
      ContentAddComponent,
      ContentEditComponent,
      PhotoComponent,
      CategoryComponent,
      LoginComponent,
      MessageComponent,
      MessageGetComponent,
      AboutusComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      LoginGuard,
      { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
