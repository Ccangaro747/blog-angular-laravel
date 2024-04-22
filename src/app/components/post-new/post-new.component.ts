import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  providers: [UserService, CategoryService]
})

export class PostNewComponent {
  public titleOne: string;
  public identity;
  public token;
  public post: Post;
  public categories: any[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.titleOne = "Crear una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.post = new Post(1, this.identity.sub, 1, '', '', '', ''); // Inicializar post con una nueva instancia de Post
    this.categories = [];
  }

  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, 'Titulo inicial', 'Contenido inicial', 'Categoria inicial', '');
  }

  onSubmit(form: NgForm) {
    console.log(this.post);

  }

  getCategories(){
    this._categoryService.getCategory().subscribe(
      (response: any) => {
        if(response.status == 'success'){
          this.categories = response.categories;
        }
      },
      (error: any) => {
        console.log(<any>error);
      }
    );
  }
}
