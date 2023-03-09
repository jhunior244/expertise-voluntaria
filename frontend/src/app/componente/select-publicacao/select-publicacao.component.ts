import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Toaster } from 'ngx-toast-notifications';
import { configuracao } from 'src/app/configuracao';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Publicacao } from 'src/app/servico/publicacao/publicacao';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';
import { TipoPublicacao } from 'src/app/servico/publicacao/tipo-publicacao';

@Component({
  selector: 'app-select-publicacao',
  templateUrl: './select-publicacao.component.html',
  styleUrls: ['./select-publicacao.component.css']
})
export class SelectPublicacaoComponent implements OnChanges, OnInit {

  @Input() controladorFormulario: FormControl;
  @Input() obrigatorio = false;
  @Input() multiplo = false;
  @Input() reservadorEspaco: string;
  @Input() exibeErro: ErrorStateMatcher;
  @Input() idSelect: string;
  @Input() idContato: string;

  public lista: Publicacao[] = [];

  constructor(
    private publicacaoService: PublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster) { }

  get possuiReservadorEspaco(): boolean {
    return this.reservadorEspaco && this.reservadorEspaco !== '';
  }

  ngOnInit(){
    this.publicacaoService.listaParaSelect(this.idContato).subscribe(page => {
      this.lista = page.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.idContato?.currentValue != null) {
      this.publicacaoService.listaParaSelect(this.idContato).subscribe(page => {
        this.lista = page.conteudo;
      }, (erro: HttpErrorResponse) => {
        console.log(erro);
        this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
      });
    }

  }

  calculaPlaceholder(): string {
    if (this.reservadorEspaco) {
      return this.reservadorEspaco;
    }
    return 'Publicação';
  }

  compara(tipo1: TipoPublicacao, tipo2: TipoPublicacao): boolean {
    return tipo1 && tipo2 && tipo1.id === tipo2.id;
  }

  irParaPublicacao(id: string): void {
    console.log(id);
    window.open(configuracao.rotaPublicacao + '/' + id, '_blank');
  }

}
