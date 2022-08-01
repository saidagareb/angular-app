import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'fileName',
    'fileType',
    'createdDate',
    'content'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement!: Post | null;

  posts: Post[];
  isVisible = true;
  directory: string;
  finalList: any[];
  x: Post;
  hideComponent: boolean = false;

  constructor(public router: Router, private postService: PostService, private httpClient: HttpClient, public dialog: MatDialog) {
    this.posts = [];
    this.x = new Post(null);
    this.directory = "";
    this.finalList = [];
  }

  onClick() {
    this.hideComponent = true;
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
      this.posts.forEach(elem => {
        this.postService.getPostByFileName(elem.fileName).subscribe(y => {
          this.x = y;
          this.directory = "http://localhost:4200/assets/" + elem.fileName;
          this.finalList.push(this.x);
          this.expandedElement = this.x;
        });
      })

    });
  }

  openDialog(post: Post): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '80%',
      height: '80%',
      data: { id: post.id, fileName: post.fileName, fileType: post.fileType, content: post.content, createdDate: post.createdDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'show-dialog',
  templateUrl: 'show-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Post) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}