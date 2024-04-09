import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Selector CSS que identifica este componente en el HTML
  templateUrl: './app.component.html', // Ubicación del archivo HTML que contiene la plantilla del componente
  styleUrls: ['./app.component.css'] // Ubicación del archivo CSS que contiene los estilos del componente
})
export class AppComponent {
  isMenuOpen = false; // Propiedad que controla si el menú está abierto o cerrado, inicializada en false
  isUserMenuOpen = false; // Propiedad que controla si el menú de usuario está abierto o cerrado, inicializada en false

  toggleMenu() { // Método para alternar el estado del menú
    this.isMenuOpen = !this.isMenuOpen; // Invierte el valor de isMenuOpen
  }

  toggleUserMenu() { // Método para alternar el estado del menú de usuario
    this.isUserMenuOpen = !this.isUserMenuOpen; // Invierte el valor de isUserMenuOpen
  }
}
