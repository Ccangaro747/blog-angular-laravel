import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css',
  providers: [UserService, CategoryService, PostService]
})

export class PostNewComponent {
  public titleOne: string;
  public identity;
  public url: string = global.url;
  public token;
  public fileName: string = '';
  public options: Object = {}
  public post: Post;
  public categories: any[];
  public status;
  public is_edit: boolean;


  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ) {
    this.titleOne = "Crear una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.status = '';
    this.is_edit = false; // o true, dependiendo de tu lógica

    // Inicializa post en el constructor
    this.post = new Post(1, this.identity.sub, 1, '', '', '', '');

    this.categories = [];
  }


  public onImageSelected(event: any) { // Función para manejar la selección de archivos
    if (event.target.files.length > 0) { // Comprueba si se ha seleccionado al menos un archivo
        let file: File = event.target.files[0]; // Obtiene el primer archivo seleccionado

        // Crea un objeto FormData para enviar los datos del formulario
        const formData = new FormData();
        formData.append("file0", file, file.name); // Agrega el archivo al formulario

        // Obtiene el token de autenticación del usuario
        let token = this._userService.getToken();

        // Configura los encabezados de la solicitud HTTP, incluyendo el token de autenticación si está disponible
        let headers = new HttpHeaders().set('Authorization', token ? token : '');

        // Realiza una solicitud HTTP POST para subir el archivo al servidor
        this._http.post(this.url + 'post/upload', formData, {headers: headers}).subscribe(
          response => {
              let data = JSON.stringify(response);
              let datos = JSON.parse(data);
              this.post.image = datos.image; // Cambia this.user.image a this.post.image
          },
          error => {
              console.log(error);
          }
      );
    } else {
        console.log('No se seleccionó ningún archivo'); // Si no se seleccionó ningún archivo, imprime un mensaje en la consola
    }
}
  ngOnInit() {
    this.getCategories();
    this.post = new Post(1, this.identity.sub, 1, 'Titulo inicial', 'Contenido inicial', 'Categoria inicial', '');
  }

  onSubmit(form: NgForm) {
    if (this.token !== null)
    this._postService.create(this.token, this.post).subscribe(
      (response: any) => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
        }
      },
      (error: any) => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
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
