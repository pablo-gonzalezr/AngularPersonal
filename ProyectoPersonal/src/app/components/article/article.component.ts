import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import swal from 'sweetalert';

import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/article';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService],
})
export class ArticleComponent implements OnInit {
  public url!: string;
  public article!: Article;
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        (response) => {
          if (response.article) {
            this.article = response.article;
          }
        },
        (error) => {
          this._router.navigate(['/**']);
        }
      );
    });
  }

  delete(id: string) {
    swal({
      title: '¿Estas seguro',
      text: 'Una ves borrado el articulo no podrás recuperarlo!',
      icon: 'warning',
      buttons: ['cancelar', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this._articleService.delete(id).subscribe((response) => {
          swal('Articulo borrado', {
            icon: 'success',
          });
          this._router.navigate(['/blog']);
        });
      } else {
        swal('El articulo no ha sido borrado');
      }
    });
  }
}
