import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SinglePostComponent } from './single-post/single-post.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'post/:id',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SinglePostComponent
      },
      {
        path: 'update',
        component: NewPostComponent
      }
    ]
  },
  {
    path: 'new-post',
    component: NewPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
