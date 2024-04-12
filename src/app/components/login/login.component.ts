import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  public user: User;
  public status: string;
  public token: string;
  public identity: string;


  constructor(
    private _userService: UserService



  ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
    this.token = '';
    this.identity = '';
  }


    onSubmit(form: NgForm) {
      this._userService.singup(this.user).subscribe(
        response => {
          //Token
          if (response.status != 'error') {
            this.status = 'success';
            this.token = response;

          //Objeto Usuario identificado
          this._userService.singup(this.user, true).subscribe(
            response => {
              this.identity = response;

              //Persistir datos usuario identificado en el localStorage del navegador

              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );
          } else {
            this.status = 'error';
          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
        }
      )

  }

}
