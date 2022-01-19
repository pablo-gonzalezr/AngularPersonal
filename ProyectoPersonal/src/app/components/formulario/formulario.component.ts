import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  public user: any;
  public regexLetters: any;
  public campo!: string;
  public enter!: string;

  constructor() {
    this.regexLetters = '[a-zA-Z ]+';
    this.user = {
      nombre: '',
      apellidos: '',
      bio: '',
      genero: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    alert('Formulario enviado');
  }

  hasDadoClick() {
    alert('Has dado click!');
  }

  hasSalido() {
    alert('Has salido');
  }

  presionaEnter() {
    alert('Has presionado enter');
  }
}
