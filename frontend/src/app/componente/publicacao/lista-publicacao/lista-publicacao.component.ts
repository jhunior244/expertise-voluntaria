import { Publicacao } from './../../../servico/publicacao/publicacao';
import { Toaster } from 'ngx-toast-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErroService } from 'src/app/core/erro/erro.service';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';

@Component({
  selector: 'app-lista-publicacao',
  templateUrl: './lista-publicacao.component.html',
  styleUrls: ['./lista-publicacao.component.css']
})
export class ListaPublicacaoComponent implements OnInit {

  public listaPublicacao: Publicacao[] = [];

  constructor(
    private publicacaoService: PublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster
  ) {
    this.publicacaoService.lista().subscribe(pagina => {
      this.listaPublicacao = pagina.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
    });
  }

  ngOnInit(): void {
  }

}
