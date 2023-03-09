import { configuracao } from 'src/app/configuracao';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { TipoPublicacao } from './../../servico/publicacao/tipo-publicacao';
import { TipoPublicacaoService } from './../../servico/publicacao/tipo-publicacao.service';

@Component({
  selector: 'app-select-tipo-publicacao',
  templateUrl: './select-tipo-publicacao.component.html',
  styleUrls: ['./select-tipo-publicacao.component.css']
})
export class SelectTipoPublicacaoComponent implements OnChanges {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;
  @Input() ehOngOsc = false;

  public lista: TipoPublicacao[] = [];
  public listaFiltrada: TipoPublicacao[] = [];

  constructor(
    private tipoPublicacaoService: TipoPublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnChanges(): void {
    this.tipoPublicacaoService.lista().subscribe(lista => {
      this.lista = lista;
      this.filtraLista();
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }

  filtraLista(): void {
    if (this.lista?.length) {
      this.listaFiltrada = this.lista.filter((tipo: TipoPublicacao) =>
        this.ehOngOsc ? tipo : tipo.id !== configuracao.tipoPublicacao.PROCURA_POR_VOLUNTARIO
      );
    }
  }



  compara(tipo1: TipoPublicacao, tipo2: TipoPublicacao): boolean {
    return tipo1 && tipo2 && tipo1.id === tipo2.id;
  }

}
