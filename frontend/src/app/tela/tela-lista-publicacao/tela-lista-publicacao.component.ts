import { forkJoin } from 'rxjs';
import { TelaInicioService } from './../tela-inicio/tela-inicio.service';
import { ErroService } from './../../core/erro/erro.service';
import { PublicacaoService } from './../../servico/publicacao/publicacao.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NovaPublicacaoComponent } from 'src/app/componente/publicacao/nova-publicacao/nova-publicacao.component';
import { Publicacao } from 'src/app/servico/publicacao/publicacao';
import { Toast, Toaster } from 'ngx-toast-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogoAguardeComponent } from 'src/app/componente/dialogo-aguarde/dialogo-aguarde.component';

@Component({
  selector: 'app-tela-lista-publicacao',
  templateUrl: './tela-lista-publicacao.component.html',
  styleUrls: ['./tela-lista-publicacao.component.css']
})
export class TelaListaPublicacaoComponent implements OnInit {

  public listaPublicacao: Publicacao[] = [];

  constructor(
    public dialog: MatDialog,
    private publicacaoService: PublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService) { }

  ngOnInit(): void {

    this.telaInicioService.botaoPesquisarClicado$.subscribe(busca => {
      this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
      if (busca) {
        this.publicacaoService.lista(
          this.telaInicioService.listaEstado,
          this.telaInicioService.listaCidade,
          this.telaInicioService.listaAreaAtuacao
        ).subscribe(pagina => {
          this.listaPublicacao = pagina.conteudo;
          this.dialog.closeAll();
        }, (erro: HttpErrorResponse) => {
          console.log(erro);
          this.dialog.closeAll();
          this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
        });
      }
    });
  }

  novaPublicacao(): void {
    const dialogRef = this.dialog.open(NovaPublicacaoComponent, {
      width: '50vw',
      height: '70vh',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
      this.publicacaoService.lista(
        this.telaInicioService.listaEstado,
        this.telaInicioService.listaCidade,
        this.telaInicioService.listaAreaAtuacao
      ).subscribe(pagina => {
        this.listaPublicacao = pagina.conteudo;
        this.dialog.closeAll();
      }, (erro: HttpErrorResponse) => {
        console.log(erro);
        this.dialog.closeAll();
        this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
      });
    });
  }

}
