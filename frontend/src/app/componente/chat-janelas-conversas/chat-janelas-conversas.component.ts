import { Subscription } from 'rxjs';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Conversa } from 'src/app/servico/usuario/conversa';
import { HttpErrorResponse } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-janelas-conversas',
  templateUrl: './chat-janelas-conversas.component.html',
  styleUrls: ['./chat-janelas-conversas.component.css']
})
export class ChatJanelasConversasComponent implements OnInit, OnDestroy {

  public listaConversa: Conversa[] = [];

  private subscricao = new Subscription();

  constructor(
    public dialog: MatDialog,
    private telaInicioService: TelaInicioService,
    private erroService: ErroService,
    private toaster: Toaster,
  ) { }

  ngOnInit(): void {

    this.subscricao.add(this.telaInicioService.listaConversaAbertaAnuncioado$.subscribe(lista => {
      this.listaConversa = lista;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    }));
  }

  ngOnDestroy(){
    this.subscricao.unsubscribe();
  }
}
