import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
import { Global } from './global';

// Los observables son los que nos permitirán recoger los datos que nos devulve la API
import { Observable } from 'rxjs';

@Injectable()
export class ArticleService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getArticles(last: any = null): Observable<any> {
    var articles = 'articles';
    if (last != null) {
      var articles = 'articles/true';
    }
    return this._http.get(this.url + articles);
  }

  getArticle(articleId: string): Observable<any> {
    return this._http.get(this.url + 'article/' + articleId);
  }
  search(searchString: string): Observable<any> {
    return this._http.get(this.url + 'search/' + searchString);
  }

  create(article: any): Observable<any> {
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'save', params, { headers: headers });
  }
  update(id: string, article: any): Observable<any> {
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'article/' + id, params, {
      headers: headers,
    });
  }

  delete(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'article/' + id, { headers: headers });
  }
}
