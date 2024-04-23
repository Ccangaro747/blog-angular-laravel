import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [PostService, UserService]
})
export class HomeComponent {
  public page_title: string;
  public url: string;
  public posts: Array<Post>;
  public identity: any;
  public token: any;

  constructor(
    private _postService: PostService,
    private _userService: UserService
  ){
    this.page_title = "Bienvenido";
    this.url = global.url;
    this.posts = [];
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if(response.status == 'success'){
          this.posts = response.posts;

          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
