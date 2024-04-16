import { Component } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
  public options: Object = {}
  constructor(
    private _userService: UserService

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
