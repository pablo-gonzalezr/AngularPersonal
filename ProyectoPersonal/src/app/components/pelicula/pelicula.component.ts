import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  @Input() pelicula!: Pelicula;
  @Input() index!: number;
  @Output() MarcarFavorita = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  seleccionar(pelicula: Pelicula) {
    this.MarcarFavorita.emit({
      pelicula: pelicula,
    });
  }
}
