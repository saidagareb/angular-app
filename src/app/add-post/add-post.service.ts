import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../post.model';


const LIST_POST_API = 'http://localhost:8081/post';
const POST_API = 'http://localhost:8081/upload'

@Injectable({
  providedIn: 'root'
})
export class AddPostService {

  constructor(private http: HttpClient) { }

  public savePost(question: Post) {
    return this.http.post<Post>(LIST_POST_API, question);
  }
  /* Add new Post */
  postFile(file: File, content: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('content', content.toString());
    const req = new HttpRequest('POST', POST_API, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log("req", req);

    return this.http.request(req);
  }
}
