import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://immense-tundra-17548.herokuapp.com/users';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.url);
  }
  getUserById(_id: string) {
    return this.http.get(`${this.url}/${_id}`);
  }

  createUser(post) {
    return this.http.post(this.url, post);
  }

  getRole() {
    return ['admin', 'redac', 'user', 'visitor'];
  }

  updateUser(_id: string, data) {
    return this.http.put(this.url + '/' + _id, data);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }
}
