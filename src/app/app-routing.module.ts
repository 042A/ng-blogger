import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './views/editor/editor.component';
import { PublicListComponent } from './views/public-list/public-list.component';
import { PrivateListComponent } from './views/private-list/private-list.component';
import { SinglePostComponent } from './views/single-post/single-post.component';

const routes: Routes = [
  { path: 'editor/:mode', component: EditorComponent, data: { animation: 'none' } },
  { path: 'public', component: PublicListComponent, data: { animation: 'none' } },
  { path: 'private', component: PrivateListComponent, data: { animation: 'none' } },
  { path: 'single', component: SinglePostComponent, data: { animation: 'none' } },
  { path: '', redirectTo: '/public', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
