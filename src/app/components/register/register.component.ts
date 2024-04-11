import { Component } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  public name: string;
  public user: User;
  public status: string; // Inicializar status aquí

  constructor(

    private _userService: UserService
  ) {
    this.name = 'John Doe';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = ''; // Inicializar status aquí
    
  }

  onSubmit(form: NgForm) {
    console.log(this._userService.test());
    console.log(form);

    this._userService.register(this.user).subscribe(
      response => {

        if (response.status == 'success') {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }



        form.reset();
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
    form.reset();
  }
}
