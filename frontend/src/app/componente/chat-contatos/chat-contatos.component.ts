import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Toaster } from 'ngx-toast-notifications';
import { Conversa } from 'src/app/servico/usuario/conversa';
import { ConversaService } from 'src/app/servico/usuario/conversa.service';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { ErroService } from './../../core/erro/erro.service';

@Component({
  selector: 'app-chat-contatos',
  templateUrl: './chat-contatos.component.html',
  styleUrls: ['./chat-contatos.component.css']
})
export class ChatContatosComponent implements OnInit, OnDestroy {

  public nome = new FormControl(null);
  public listaConversas: Conversa[] = [];
  private intervalAtualizaListaConversa: any;

  constructor(
    private conversaService: ConversaService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioServico: TelaInicioService
  ) { 
  }

  ngOnInit(): void {
    this.telaInicioServico.listaConversaChatAnuncioado$.subscribe(lista => this.listaConversas = lista);

    this.lista();

    this.intervalAtualizaListaConversa = setInterval(() => {
      this.lista();
    }, 5000);

  }

  lista(): void{
    this.conversaService.listaParaChat(0, 1000).subscribe(pagina => {
      this.telaInicioServico.anunciaListaConversaChat(pagina.conteudo);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.message, this.toaster);
    });
  }

  abreChat(conversa: Conversa): void {
    this.telaInicioServico.abreNovaJanelaChat(conversa);
  }

  

  ngOnDestroy(): void {
    if (this.intervalAtualizaListaConversa) {
      clearInterval(this.intervalAtualizaListaConversa);
    }
  }
}

