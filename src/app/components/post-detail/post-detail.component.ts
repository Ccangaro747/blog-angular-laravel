import { Component, OnInit } from '@angular/core';
import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public sanitizedContent: SafeHtml = [];
  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private SafeHtml: DomSanitizer,
  ) {
    // Inicializa la propiedad post en el constructor
    this.post = new Post(0, 0, 0, '', '', '', null);

  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    // Sacar el id del post de la url
    this._route.params.subscribe(params => {
      let id = +params['id'];

      // Aquí puedes hacer la petición AJAX para obtener los datos del post
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
            // Sanitizar el contenido HTML antes de asignarlo a la variable
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
            console.log(this.post);
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(<any>error);
          this._router.navigate(['/inicio']);
        }

      );
      // usando el id obtenido de los parámetros de la ruta.
    });
  }
}
