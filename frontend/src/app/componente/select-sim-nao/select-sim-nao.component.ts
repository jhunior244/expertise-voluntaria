import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-sim-nao',
  templateUrl: './select-sim-nao.component.html',
  styleUrls: ['./select-sim-nao.component.css']
})
export class SelectSimNaoComponent implements OnInit {

  @Input() controladorFormulario: FormControl;

  @Input() reservadorEspaco: string;
  @Input() reservadorEspacoSim: string;
  @Input() reservadorEspacoNao: string;
  @Input() reservadorEspacoTodos: string;

  @Input() obrigatorio = false;

  public listaOpcao: { valor: number, valorExibicao: string }[] = [];

  constructor() {}

  ngOnInit() {
    this.listaOpcao = [
      { valor: 2, valorExibicao:  this.reservadorEspacoTodos ? this.reservadorEspacoTodos : 'Todos'  },
      { valor: 1, valorExibicao: this.reservadorEspacoSim ? this.reservadorEspacoSim : 'Sim' },
      { valor: 0, valorExibicao: this.reservadorEspacoNao ? this.reservadorEspacoNao : 'Nao' },
    ];
  }

}
