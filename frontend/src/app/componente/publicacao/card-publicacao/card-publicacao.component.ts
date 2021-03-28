import { ConversaService } from './../../../servico/usuario/conversa.service';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { Conversa } from './../../../servico/usuario/conversa';
import { configuracao } from './../../../configuracao';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../servico/usuario/usuario.service';
import { Publicacao } from './../../../servico/publicacao/publicacao';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Usuario } from 'src/app/servico/usuario/usuario';

@Component({
  selector: 'app-card-publicacao',
  templateUrl: './card-publicacao.component.html',
  styleUrls: ['./card-publicacao.component.css']
})
export class CardPublicacaoComponent implements OnInit, OnChanges {

  @Input() publicacao: Publicacao;

  public usuarioEhContato = false;
  private emailUsuarioLogado;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private telaInicioService: TelaInicioService,
    private conversaService: ConversaService 
  ) { 
    this.emailUsuarioLogado = this.usuarioService.getEmail();
  }

  get publicacaoPertenceUsuarioLogado(): boolean { return this.emailUsuarioLogado === this.publicacao?.usuario?.email; }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

  entrarEmContato(id: string){
    this.router.navigate([configuracao.rotaInterno + '/' + configuracao.rotaVisualizaContato, id]);
  }

  enviarMensagem(usuario: Usuario){
    const conversa = new Conversa();
    conversa.contato = usuario;
    this.conversaService.cria(conversa).subscribe(conversaRetornada => {
      this.telaInicioService.abreNovaJanelaChat(conversaRetornada);
    });
  }



}
