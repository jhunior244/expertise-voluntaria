import { configuracao } from './../../configuracao';
import { TipoUsuario } from './../../servico/usuario/tipo-usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { AreaAtuacao } from 'src/app/servico/area-atuacao/area-atuacao';
import { AreaAtuacaoService } from './../../servico/area-atuacao/area-atuacao.service';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';

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
  @Input() tipoUsuario: TipoUsuario;

  public lista: AreaAtuacao[] = [];

  constructor(
    private areaAtuacaoService: AreaAtuacaoService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService
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

    this.controladorFormulario.valueChanges.subscribe((lista: AreaAtuacao[]) => {
      this.telaInicioService.anunciaListaAreaAtuacao(lista);
    });
  }

  calculaPlaceholder(): string {
    if (this.reservadorEspaco) {
      return this.reservadorEspaco;
    }
    if (this.tipoUsuario == null || this.tipoUsuario.ehPessoaFisica() || this.tipoUsuario.ehPessoaJuridica()) {
      return 'Áreas de atuação';
    }
    return 'Áreas possíveis para atuação de voluntários';
  }

  calculaTooltip(): string {
    if (this.tipoUsuario == null || this.tipoUsuario.ehPessoaFisica()) {
      return 'Selecione as possíveis áreas de atuação que você pode auxiliar as instituições.';
    } else if (this.tipoUsuario.ehPessoaJuridica()) {
      return 'Selecione as possíveis áreas de atuação que sua empresa pode auxiliar as instituições.';
    } else {
      return 'Selecione as áreas possíveis para atuação de voluntários. Pode ser os setores existentes na instituição ou a principal atividade exercida pela instituição.';
    }

  }

  compara(obj1: AreaAtuacao, obj2: AreaAtuacao): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

}
