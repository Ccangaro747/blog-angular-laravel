// Importa la clase Category desde el archivo category ubicado en el directorio models.
import { Category } from './../models/category';

// Importa el decorador Injectable desde el módulo @angular/core.
// Injectable se utiliza para marcar una clase como un proveedor de servicios.
import { Injectable } from '@angular/core';

// Importa las clases HttpClient y HttpHeaders desde el módulo @angular/common/http.
// HttpClient se utiliza para realizar solicitudes HTTP y HttpHeaders para configurar cabeceras HTTP.
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Importa la clase Observable desde la librería rxjs.
// Observable se utiliza para manejar flujos de datos asíncronos.
import { Observable } from 'rxjs';

// Importa el objeto global desde el archivo global ubicado en el directorio raíz.
// global probablemente contiene valores globales utilizados en la aplicación.
import { global } from './global';


@Injectable()
export class CategoryService{
  public url: string;

  constructor(
    private _http: HttpClient
  ){
    this.url = global.url;
  }

  //Crear un método para el servicio que se encargue de crear o guardar una nueva categoría
  create(token: string, category: Category): Observable<any>{
    let json = JSON.stringify(category);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') //Este es el formato de formulario que se envía por defecto
                                   .set('Authorization', token);

    return this._http.post(this.url+'category', params, {headers: headers});
  }


  //Crear un método para el servicio que se encargue de obtener todas las categorías
  getCategory(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+'category', {headers: headers});
  }
  // Crear un método para el servicio que se encargue de obtener una categoría en específico
  getCategoryById(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+'category/'+id, {headers: headers});
  }
  // Crear un método para el servicio que se encargue de obtener los posts de una categoría en específico
  getPosts(id: number): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+'post/category/'+id, {headers: headers});
  }


}
