import { Injectable } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Injectable()
export class PeliculaService {
  public peliculas!: Pelicula[];

  constructor() {
    this.peliculas = [
      new Pelicula(
        'Spiderman 4',
        2019,
        'https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg'
      ),
      new Pelicula(
        'Avengers',
        2022,
        'https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg'
      ),
      new Pelicula(
        'Thor',
        2023,
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/thor-love-and-thunder-fan-poster-1564039042.jpg'
      ),
      new Pelicula(
        'Batman',
        2024,
        'https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg'
      ),
    ];
  }
  holaMundo() {
    return 'hola mundo desde el servicio de Angular';
  }
  getPeliculas() {
    return this.peliculas;
  }
}
