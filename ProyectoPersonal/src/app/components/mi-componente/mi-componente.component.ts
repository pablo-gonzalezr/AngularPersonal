import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'mi-componente',
  templateUrl: './mi-componente.component.html',
})
export class MiComponenteComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public comentario: string;
  public year: number;
  public mostrar: boolean;

  constructor() {
    this.titulo = 'Hola mundo desde un componente';
    this.comentario = 'Hola desde un comentario';
    this.year = 2022;
    this.mostrar = true;
    console.log('contructor lanzado');
  }
  ngOnInit(): void {
    console.log('Componente iniciado');
  }

  ngDoCheck(): void {
    console.log('DoCheck lanzado');
  }

  ngOnDestroy(): void {
    console.log('OnDestroy lanzado');
  }

  cambiarTitulo() {
    this.titulo = 'El titulo ha sido cambiado';
  }

  eliminarTitulo() {
    this.mostrar = false;
  }
}
