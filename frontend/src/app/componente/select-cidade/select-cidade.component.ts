import { TelaInicioService } from './../../tela/tela-inicio/tela-inicio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from './../../core/erro/erro.service';
import { Cidade } from './../../servico/usuario/cidade';
import { CidadeService } from './../../servico/usuario/cidade.service';

@Component({
  selector: 'app-select-cidade',
  templateUrl: './select-cidade.component.html',
  styleUrls: ['./select-cidade.component.css']
})
export class SelectCidadeComponent implements OnInit, OnChanges {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  @Input() estado: string;

  private lista: Cidade[] = [];
  public listaFiltrada: Cidade[] = [];

  constructor(
    private cidadeService: CidadeService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService
  ) { }

  ngOnInit(): void {
    this.cidadeService.lista().subscribe(lista => {
      this.lista = lista;
      this.listaFiltrada = this.lista;
      this.filtraCidade();
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });

    this.controladorFormulario.valueChanges.subscribe((lista: Cidade[]) => {
      this.telaInicioService.anunciaListaCidade(lista);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.estado?.currentValue != null) {
      this.filtraCidade();
    }
  }

  filtraCidade(): void {
    if (this.listaFiltrada) {
      this.listaFiltrada = this.lista.filter(
        cidade => cidade?.estado?.uf === this.estado
      );
    }
  }

  compara(obj1: Cidade, obj2: Cidade): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
