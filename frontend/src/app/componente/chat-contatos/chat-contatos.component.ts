import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from './../../core/erro/erro.service';
import { UsuarioService } from './../../servico/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { ConversaService } from 'src/app/servico/usuario/conversa.service';
import { Conversa } from 'src/app/servico/usuario/conversa';

@Component({
  selector: 'app-chat-contatos',
  templateUrl: './chat-contatos.component.html',
  styleUrls: ['./chat-contatos.component.css']
})
export class ChatContatosComponent implements OnInit {

  public nome = new FormControl(null);
  public listaConversas: Conversa[] = [];

  constructor(
    private conversaService: ConversaService,
    private erroService: ErroService,
    private toaster: Toaster,
    private telaInicioServico: TelaInicioService
  ) { }

  ngOnInit(): void {
    this.conversaService.listaParaChat(0, 15).subscribe(pagina => {
      this.listaConversas = pagina.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.message, this.toaster);
    });
  }

  abreChat(conversa: Conversa) {
    this.telaInicioServico.abreNovaJanelaChat(conversa);
  }
}

