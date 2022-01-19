import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService],
})
export class HomeComponent implements OnInit {
  public title: string;
  public articles!: Article[];

  constructor(private _articleService: ArticleService) {
    this.title = 'Últimos articulos';
  }

  ngOnInit(): void {
    // Observable tiene un método que se llama subscribe que me permite recoger los datos que me devulve la peticion HTTP
    this._articleService.getArticles(true).subscribe((response) => {
      if (response.articles) {
        this.articles = response.articles;
      }
    });
  }
}
