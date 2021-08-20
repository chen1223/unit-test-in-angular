import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  userName?: string;
  title: string;
  body: string;
}

export interface Author {
  id: number;
  name: string;
}

export const AUTHOR_LIST = [
  {
    id: 1,
    name: 'Kyan Adkins'
  },
  {
    id: 2,
    name: 'Hadiya Powers'
  },
  {
    id: 3,
    name: 'Manuel Leach'
  },
  {
    id: 4,
    name: 'Rosa Hayes'
  },
  {
    id: 5,
    name: 'Arabella Higgins'
  },
  {
    id: 6,
    name: 'Issa Stevens'
  },
  {
    id: 7,
    name: 'Pooja Flores'
  },
  {
    id: 8,
    name: 'Ariah Osborne'
  },
  {
    id: 9,
    name: 'Ansh Finnegan'
  },
  {
    id: 10,
    name: 'Bethan Winter'
  }
];

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // Acquire Author name based on user id
  getAuthor(id: number): string {
    return AUTHOR_LIST.find(author => author.id === id).name;
  }

  getAllPosts(): Observable<Array<Post>> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get<Array<Post>>(url);
  }

  getSinglePost(postId: string): Observable<Post> {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    return this.http.get<Post>(url);
  }

  createPost(title: string, body: string): Observable<Post> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = {
      title,
      body
    };
    return this.http.post<Post>(url, data);
  }

  updatePost(postId: string, title: string, body: string): Observable<Post> {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const data = {
      title,
      body
    };
    return this.http.patch<Post>(url, data);
  }

  deletePost(postId: string): Observable<void> {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    return this.http.delete<void>(url);
  }
}
