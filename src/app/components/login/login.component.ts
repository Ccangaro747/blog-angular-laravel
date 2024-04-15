import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public token: string | null;
  public identity: string | null;
  public isUserMenuOpen: boolean;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,

  ) {
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = '';
    this.token = null;
    this.identity = null;
    this.isUserMenuOpen = false;
  }

  ngOnInit() {
    this.logout();
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

              if (this.token != null) {
                localStorage.setItem('token', this.token);
              }

              if (this.identity != null) {
                localStorage.setItem('identity', JSON.stringify(this.identity));
              }
                      //Redirección a la página de inicio
                      this._router.navigate(['inicio']);
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
      );

  }
  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // Ocultar el menú de usuario
        this.isUserMenuOpen = false;

        //Redirección a la página de inicio
        this._router.navigate(['inicio']);
      }
    });
  }


}
