import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TopiclistComponent } from './topiclist/topiclist.component';
import { TopicComponent } from './topic/topic.component';
import { TopicitemComponent } from './topiclist/topicitem/topicitem.component';
import { CreatetopicComponent } from './createtopic/createtopic.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostComponent } from './topic/post/post.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: TopiclistComponent },
  { path: 'topic/:id', component: TopicComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopiclistComponent,
    TopicComponent,
    TopicitemComponent,
    CreatetopicComponent,
    CreatepostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
