export class Post {
  constructor(
    public id: number,
    public user_id: number,
    public category_id: number,
    public title: string,
    public content: string,
    public image: string,
    public created_at: any,
    public category?: { name: string },  // Añade esta línea si `category` es una propiedad de `Post`
    public user?: { name: string, surname: string }  // Añade esta línea
  ) {}
}
