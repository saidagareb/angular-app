export class Post {
  id: string;
  content: string;
  createdDate: string;
  fileName: string;
  fileType: string;

  constructor(post: any) {
    post = post || {};
    this.id = post.id || '';
    this.content = post.content || '';
    this.createdDate = post.createdDate || '';
    this.fileName = post.fileName || '';
    this.fileType = post.fileType || '';
  }
}
