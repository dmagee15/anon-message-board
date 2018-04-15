import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {
    constructor(private http: Http) {}
    getTopics(){
       return this.http.get('/gettopiclist');
    }
    getPosts(id: number){
        return this.http.get('/getposts/'+id);
    }
    submitTopic(topic: {title: string, content: string}){
        return this.http.post('/submittopic', topic);
    }
    submitPost(post: {id: number, content: string}){
        return this.http.post('/submitpost', post);
    }

}