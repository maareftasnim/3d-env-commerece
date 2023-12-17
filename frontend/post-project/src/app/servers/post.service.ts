import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  url = 'http://127.0.0.1:3000/post/';

  create(post: any) {
    return this.http.post(this.url + 'ajout', post);
  }
  getPostDetailsById(postId: any) {
    return this.http.get(`http://localhost:3000/getpostbyid/${postId}`);
  }
  getall() {
    return this.http.get(this.url + 'getall');
  }
  getpostbyid(id: any) {
    return this.http.get(this.url + 'getpostbyid/' + id);
  }
  getpostbyiduser(id: any) {
    return this.http.get(this.url + 'getbyiduser/' + id);
  }

  deletepost(id: any) {
    return this.http.delete(this.url + '/supprimer/' + id);
  }

  update(id:any ,data: any) {
    return this.http.put(this.url + '/update/' +id, data);
  }

}
