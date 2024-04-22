import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

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
  public url: string = 'http://127.0.0.1:8000/api/'; // Añade esta línea para definir url. Podria añadirla aca, o desde el archivo global creado, dentro de la carpeta services
  public fileName: string = ''; // Añade esta línea para definir fileName
  public options: Object = {}
  public post: Post;
  public categories: any[];


  constructor(
    private _http: HttpClient, // Inyecta HttpClient en el constructor
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.titleOne = "Crear una entrada";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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
