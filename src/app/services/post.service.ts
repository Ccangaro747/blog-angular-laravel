// Importa la clase Post desde el archivo post ubicado en el directorio models.
import { Post } from './../models/post';

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
export class PostService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  pruebas() {
    return 'Soy el servicio de entradas';
  }

  create(token: string, post: Post): Observable<any> {
    let json = JSON.stringify(post);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.post(this.url + 'post', params, { headers: headers });
  }

  // Método para obtener las entradas de la base de datos. Devuelve un Observable.
  getPosts(): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );

    return this._http.get(this.url + 'post', { headers: headers });
  }

  getPost(id: number | string): Observable<any> {
    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    );
    return this._http.get(this.url + 'post/' + id, { headers: headers });
  }

  //Componente para editar los posts
  update(token: string, post: Post, id: number): Observable<any> {
    let json = JSON.stringify(post);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'post/' + id, params, {
      headers: headers,
    });
  }

  //Codigo comentado:
  /*// Método para obtener todas las entradas de la base de datos. Devuelve un Observable.

getPosts(): Observable<any>{
    // Se definen las cabeceras HTTP con el tipo de contenido como 'application/x-www-form-urlencoded'.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Se realiza una solicitud HTTP GET al endpoint 'this.url + 'post'', con las cabeceras definidas.
    return this._http.get(this.url+'post', {headers: headers});
}

// Método para obtener una entrada específica de la base de datos. Devuelve un Observable.

getPost(id: number | string): Observable<any>{
    // Se definen las cabeceras HTTP con el tipo de contenido como 'application/x-www-form-urlencoded'.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Se realiza una solicitud HTTP GET al endpoint 'this.url + 'post/' + id', con las cabeceras definidas.
    return this._http.get(this.url+'post/'+id, {headers: headers});
}

// Método para actualizar una entrada en la base de datos. Devuelve un Observable.

update(token: string, post: Post, id: number): Observable<any>{
    // Se serializa el objeto 'post' a JSON.
    let json = JSON.stringify(post);
    // Se construyen los parámetros de la solicitud en formato 'json=...'.
    let params = "json="+json;

    // Se definen las cabeceras HTTP con el tipo de contenido como 'application/x-www-form-urlencoded'
    // y se agrega un encabezado de autorización usando el token proporcionado.
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);

    // Se realiza una solicitud HTTP PUT al endpoint 'this.url + 'post/' + id', con los parámetros y cabeceras definidos.
    return this._http.put(this.url+'post/'+id, params, {headers: headers});
}
*/
/*getPosts() y getPost(id: number | string): Estos son métodos para obtener entradas (o posts) de la base de datos. Ambos métodos devuelven un Observable que emitirá los resultados una vez que se complete la solicitud HTTP. getPosts() devuelve todas las entradas, mientras que getPost(id) devuelve una sola entrada identificada por su ID.

update(token: string, post: Post, id: number): Este método se utiliza para actualizar una entrada en la base de datos. Toma tres parámetros: un token de autorización, el objeto de la entrada que se va a actualizar y el ID de la entrada que se va a actualizar. El objeto de entrada se serializa a JSON y se envía como datos en la solicitud HTTP PUT.*/
}
