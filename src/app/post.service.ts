import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from "./post.model";

const LIST_POST_URI = 'http://localhost:8081/post';
const GET_POST_URI = 'http://localhost:8081/get/image/info/';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private http: HttpClient) {

  }
  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(LIST_POST_URI);
  }

  public getPostByFileName(fileName: string): Observable<Post> {
    return this.http.get<Post>(GET_POST_URI + fileName);
  }
}
