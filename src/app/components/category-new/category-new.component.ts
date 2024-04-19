import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Category } from '../../models/category';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent {
  public title: string;
  public identity;
  public token: string | null;
  public category: Category;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.title = "Crear nueva categoría";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1, '');
    this.status = '';
  }

  onSubmit(form: NgForm){
    if (this.token) {
      this._categoryService.create(this.token, this.category).subscribe(
        response => {
          if(response.status == 'success'){
            this.category = response.category;
            this.status = 'success';
            this._router.navigate(['/inicio']);
          }else{
            this.status = 'error';
          }
        },
        error => {
          this.status = 'error';
          console.log(<any>error);
        }
      )
    } else {
      // Manejar el caso en que this.token es nulo
      console.log('Token es nulo');
    }
  }
}
