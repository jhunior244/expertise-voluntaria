import { Component, Input, OnInit } from '@angular/core';
import { Conversa } from 'src/app/servico/usuario/conversa';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';

@Component({
  selector: 'app-conversa-chat',
  templateUrl: './conversa-chat.component.html',
  styleUrls: ['./conversa-chat.component.css']
})
export class ConversaChatComponent implements OnInit {
  
  @Input() conversa: Conversa;
  
  constructor(
    private telaInicioServico: TelaInicioService) { }

  ngOnInit(): void {
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

  abreChat(conversa: Conversa): void {
    this.telaInicioServico.abreNovaJanelaChat(conversa);
  }

}
