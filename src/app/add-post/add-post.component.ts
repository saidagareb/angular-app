import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../post.model';
import { AddPostService } from './add-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  post: Post;
  currentDate = new Date();
  fileToUpload: File | any = null;
  content: string;

  constructor(private addPostService: AddPostService, public router: Router, private toastr: ToastrService) {

    this.post = new Post(null);
    this.content = "";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    this.addPostService.postFile(this.fileToUpload, this.post.content).subscribe(data => {
    }
      , error => {
        this.toastr.error("Error, Post Not saved");

        console.log(error);
      });
    this.toastr.success("Post saved with success");

    this.router.navigate(['/']);
  }
}
