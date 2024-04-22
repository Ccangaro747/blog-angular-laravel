import { Component } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent {
  public title: string;
  public user: User;
  public status;
  public identity;
  public token;
  public url: string = 'http://127.0.0.1:8000/api/'; // Añade esta línea para definir url
  public fileName: string = ''; // Añade esta línea para definir fileName
  public options: Object = {}


  //Función para manejar la selección de archivos y su carga, imagen

  public onFileSelected(event: any) { // Función para manejar la selección de archivos
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
        this._http.post(this.url + 'upload', formData, {headers: headers}).subscribe(
            response => { // Función para manejar la respuesta exitosa
                let data = JSON.stringify(response); // Convierte la respuesta a JSON
                let datos = JSON.parse(data); // Parsea los datos JSON
                this.user.image = datos.image; // Asigna la imagen recibida a alguna propiedad de la clase
            },
            error => { // Función para manejar errores
                console.log(error); // Imprime el error en la consola
            }
        );
    } else {
        console.log('No se seleccionó ningún archivo'); // Si no se seleccionó ningún archivo, imprime un mensaje en la consola
    }
}




  constructor(
    private _userService: UserService,
    private _http: HttpClient
  ) {
    this.title = 'Ajustes de usuario';
    this.user = new User(1, '', '', '', '', '', '', '');
    this.status = '';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // Rellenar objeto usuario con los datos del usuario identificado en la base de datos
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image
    );
  }

  onSubmit(form: NgForm) {
    if (this.token != null) {
      this._userService.update(this.token, this.user).subscribe(
        response => {
          if(response && response.status == 'success'){
            console.log(response);
            this.status = 'success';

            // Actualizar usuario en sesión
            if(response.changes.name){
              this.user.name = response.changes.name;
            }
            if(response.changes.surname){
              this.user.surname = response.changes.surname;
            }
            if(response.changes.email){
              this.user.email = response.changes.email;
            }
            if(response.changes.description){
              this.user.description = response.changes.description;
            }
            if(response.changes.image){
              this.user.image = response.changes.image;
            }

            this.identity = this.user;
            localStorage.setItem('identity', JSON.stringify(this.identity));

          }else{

            this.status = 'error';

          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
        }
      );
    }
  }
  }
