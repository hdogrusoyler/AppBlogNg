import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ContentDetailComponent } from './content/content-detail/content-detail.component';

import { ValueComponent } from './value/value.component';
import { ValueDetailComponent } from './value/value-detail/value-detail.component';
import { ContentAddComponent } from './content/content-add/content-add.component';
import { PhotoComponent } from './photo/photo.component';
import { CategoryComponent } from './category/category.component';
import { ContentEditComponent } from './content/content-edit/content-edit.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { MessageGetComponent } from './message/message-get/message-get.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  { path: 'content', component: ContentComponent, canActivate: [LoginGuard]},
  { path: 'content/:contentId', component: ContentDetailComponent, canActivate: [LoginGuard] },
  { path: 'contentadd', component: ContentAddComponent, canActivate: [LoginGuard] },
  { path: 'contentedit/:contentId', component: ContentEditComponent, canActivate: [LoginGuard] },
  { path: 'contentCategory/:contentCategoryId', component: ContentComponent, canActivate: [LoginGuard] },
  { path: 'contentFilter/:contentFilterString', component: ContentComponent, canActivate: [LoginGuard] },
  { path: 'messageget', component: MessageGetComponent, canActivate: [LoginGuard] },

  { path: 'categoryadd', component: CategoryComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },

  { path: 'value', component: ValueComponent },
  { path: 'value/:valueId', component: ValueDetailComponent },
  { path: 'category/:categoryId', component: ValueComponent },
  { path: 'filter/:filterString', component: ValueComponent },

  { path: 'hakkimizda', component: AboutusComponent },
  { path: 'iletisim', component: MessageComponent },
  { path: '**', redirectTo: 'value', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
