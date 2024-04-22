import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root', // Selector CSS que identifica este componente en el HTML
  templateUrl: './app.component.html', // Ubicación del archivo HTML que contiene la plantilla del componente
  styleUrls: ['./app.component.css'], // Ubicación del archivo CSS que contiene los estilos del componente
  providers: [UserService, CategoryService] // Servicios que necesita este componente
})
export class AppComponent implements OnInit, DoCheck{
  isMenuOpen = false; // Propiedad que controla si el menú está abierto o cerrado, inicializada en false
  isUserMenuOpen = false; // Propiedad que controla si el menú de usuario está abierto o cerrado, inicializada en false

  toggleMenu() { // Método para alternar el estado del menú
    this.isMenuOpen = !this.isMenuOpen; // Invierte el valor de isMenuOpen
  }

  toggleUserMenu() { // Método para alternar el estado del menú de usuario
    this.isUserMenuOpen = !this.isUserMenuOpen; // Invierte el valor de isUserMenuOpen
  }

  public identity; // Propiedad que almacena la identidad del usuario
  public token; // Propiedad que almacena el token del usuario
  public categories: any; // Propiedad que almacena las categorías

  constructor(private _userService: UserService, private _categoryService: CategoryService) { // Es privado para que no se pueda acceder desde fuera de la clase
    this.identity = this._userService.getIdentity(); // Obtiene la identidad del usuario
    this.token = this._userService.getToken(); // Obtiene el token del usuario
  }
  ngOnInit(){
    console.log('AppComponent cargado');
    this.getCategories(); // Llama al método getCategories() al inicializar el componente para obtener las categorías de la base de datos y almacenarlas en la propiedad categories del componente
  }

  ngDoCheck(){
    this.loadUser();
  }
  loadUser() {
    this.identity = this._userService.getIdentity(); // Obtiene la identidad del usuario
    this.token = this._userService.getToken(); // Obtiene el token del usuariodentidad del usuario
  }
  getCategories() {
    this._categoryService.getCategory().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
