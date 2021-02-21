import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { AreaAtuacao } from 'src/app/servico/area-atuacao/area-atuacao';
import { AreaAtuacaoService } from './../../servico/area-atuacao/area-atuacao.service';

@Component({
  selector: 'app-select-area-atuacao',
  templateUrl: './select-area-atuacao.component.html',
  styleUrls: ['./select-area-atuacao.component.css']
})
export class SelectAreaAtuacaoComponent implements OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;

  public lista: AreaAtuacao[] = [];

  constructor(
    private areaAtuacaoService: AreaAtuacaoService,
    private erroService: ErroService,
    private toaster: Toaster
  ) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit(): void {
    this.areaAtuacaoService.lista().subscribe(pagina => {
      this.lista = pagina.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error?.message, this.toaster);
    });
  }

  compara(obj1: AreaAtuacao, obj2: AreaAtuacao): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
