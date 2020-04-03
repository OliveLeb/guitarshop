import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) {}
  url = 'https://immense-tundra-17548.herokuapp.com/articles';

  quillConfig: object = {
    toolbar: [
      ['bold', 'italic'],
      [{ color: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['clean']
    ]
  };
  categorieArticle: Array<string> = [
    'guitare',
    'cordes',
    'ampli',
    'electrique',
    'acoustique',
    'electro-acoustique',
    'tele',
    'strat',
    'double cut',
    'single cut',
    'folk',
    'classique',
    '6 cordes',
    '12 cordes',
    'a_modelisation',
    'a_pile',
    'a_lampes',
    'a_transistor'
  ];

  getAllArticles() {
    return this.http.get(this.url);
  }

  getArticleById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  createArticle(post: object) {
    return this.http.post(this.url, post);
  }

  updateArticle(_id: string, data: object) {
    return this.http.put(this.url + '/' + _id, data);
  }
  deleteArticle(_id: string) {
    return this.http.delete(this.url + '/' + _id);
  }
}
