import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  constructor(private http: HttpClient) {}
  url = 'https://immense-tundra-17548.herokuapp.com/parametres';

  quillConfigTitre: object = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }]
    ]
  };
  quillConfigTexte: object = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean']
    ]
  };

  getParam() {
    return this.http.get(this.url);
  }
  postParam(post) {
    return this.http.post(this.url, post);
  }
  updateParam(_id: string, data) {
    return this.http.put(`${this.url}/${_id}`, data);
  }
}
