import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService],
})
export class ArticleEditComponent implements OnInit {
  public status!: string;
  public article!: Article;
  public is_edit!: boolean;
  public page_title: string;
  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: 50,
    uploadAPI: {
      url: Global.url + 'upload-image',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,

    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    },
  };
  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', '', null);
    this.is_edit = true;
    this.page_title = 'Editar articulo';
  }

  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit() {
    this._articleService
      .update(this.article._id, this.article)
      .subscribe((response) => {
        if (response.status == 'success') {
          this.status = response.status;
          this.article = response.article;

          swal(
            '¡Articulo Editado!',
            'El articulo ha sido editado correctamente',
            'success'
          );
          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
        }
      });
  }

  imageUpload(data: any) {
    this.article.image = data.body.aimage;
  }

  getArticle() {
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
}
