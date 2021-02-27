import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
export class SelectTipoPublicacaoComponent implements OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  public lista: TipoPublicacao[] = [];

  constructor(
    private tipoPublicacaoService: TipoPublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit() {
    this.tipoPublicacaoService.lista().subscribe(lista => {
      this.lista = lista;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }



  compara(tipo1: TipoPublicacao, tipo2: TipoPublicacao): boolean {
    return tipo1 && tipo2 && tipo1.id === tipo2.id;
  }

}
