import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public name: string;
  public user: User;

  constructor() {
    this.name = 'John Doe';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  onSubmit(form: Form) {
    console.log(this.user);
    console.log(form);
  }
}
