import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  // url: string = "http://localhost:6400/commentaires";

  constructor(private http: HttpClient) {}
  url = 'https://immense-tundra-17548.herokuapp.com/commentaires';
  quillConfig: object = {
    toolbar: [['bold', 'italic'], [{ color: [] }], ['emoji'], ['clean']]
  };

  getCommentaire() {
    return this.http.get(this.url);
  }
  getCommentaireById(_id: string) {
    return this.http.get(this.url + '/' + _id);
  }
  createCommentaire(post: object) {
    return this.http.post(this.url, post);
  }
  updateCommentaire(_id: string, data: object) {
    return this.http.put(this.url + '/' + _id, data);
  }
  deleteCommentaire(_id: string) {
    return this.http.delete(this.url + '/' + _id);
  }
}
