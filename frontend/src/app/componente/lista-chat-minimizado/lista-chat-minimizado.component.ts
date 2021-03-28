import { Subscription } from 'rxjs';
import { TelaInicioService } from './../../tela/tela-inicio/tela-inicio.service';
import { Conversa } from './../../servico/usuario/conversa';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lista-chat-minimizado',
  templateUrl: './lista-chat-minimizado.component.html',
  styleUrls: ['./lista-chat-minimizado.component.css']
})
export class ListaChatMinimizadoComponent implements OnInit, OnDestroy {

  public listaConversa: Conversa[] = [];
  public subscricao = new Subscription();

  constructor(
    private telaInicioService: TelaInicioService
  ) { }

  ngOnInit(): void {
    this.subscricao.add(this.telaInicioService.listaConversaMinimizadaAnuncioado$.subscribe(lista => {
      this.listaConversa = lista;
    }));
  }

  calculaAbreviacao(conversa: Conversa): string {
    if (conversa?.contato?.nome) {
      const nomes = conversa.contato.nome.split(' ');
      if (nomes.length > 1) {
        return nomes[0].charAt(0).toUpperCase().concat(nomes[nomes.length - 1].charAt(0).toUpperCase());
      }
      return conversa.contato.nome[0].toUpperCase();
    }
    return '';
  }

  maximinizar(conversa: Conversa): void {
    this.telaInicioService.maximinizaJanelaChat(conversa);
  }

  ngOnDestroy(): void {
    this.subscricao.unsubscribe();
  }

}
