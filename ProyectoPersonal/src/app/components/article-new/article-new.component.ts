import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService],
})
export class ArticleNewComponent implements OnInit {
  public status!: string;
  public article!: Article;
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
    this.page_title = 'Crear articulo';
  }

  ngOnInit(): void {}

  onSubmit() {
    this._articleService.create(this.article).subscribe((response) => {
      if (response.status == 'success') {
        this.status = 'success';
        this.article = response.article;

        swal(
          '¡Articulo creado!',
          'El articulo se ha creado correctamente',
          'success'
        );

        this._router.navigate(['/blog']);
      } else {
        this.status = 'error';
      }
    });
  }

  imageUpload(data: any) {
    this.article.image = data.body.aimage;
  }
}
