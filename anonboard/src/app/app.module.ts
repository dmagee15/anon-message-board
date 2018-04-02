import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TopiclistComponent } from './topiclist/topiclist.component';
import { TopicComponent } from './topic/topic.component';
import { TopicitemComponent } from './topiclist/topicitem/topicitem.component';
import { CreatetopicComponent } from './createtopic/createtopic.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostComponent } from './topic/post/post.component';


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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
