import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogoAguardeComponent } from 'src/app/componente/dialogo-aguarde/dialogo-aguarde.component';
import { configuracao } from 'src/app/configuracao';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { TelaInicioService } from '../tela-inicio/tela-inicio.service';

@Component({
  selector: 'app-tela-lista-contatos',
  templateUrl: './tela-lista-contatos.component.html',
  styleUrls: ['./tela-lista-contatos.component.css']
})
export class TelaListaContatosComponent implements OnInit, OnDestroy {

  public listaUsuario: Usuario[] = [];
  public nome = new FormControl(null);

  private subscricao = new Subscription();

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioService: TelaInicioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.telaInicioService.anunciaexibeFiltro(true);
    this.telaInicioService.anunciaExibeFiltroTodasPublicacoes(false);
  }

  ngOnInit(): void {
    this.subscricao.add(this.telaInicioService.botaoPesquisarClicado$.subscribe(busca => {
      if (busca) {
        this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
        this.usuarioService.lista(
          this.telaInicioService.listaEstado,
          this.telaInicioService.listaCidade,
          this.telaInicioService.listaAreaAtuacao,
          this.nome.value
        ).subscribe(pagina => {
          this.dialog.closeAll();
          this.listaUsuario = pagina.conteudo;
        }, (erro: HttpErrorResponse) => {
          console.log(erro);
          this.dialog.closeAll();
          this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
        });
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }

}
