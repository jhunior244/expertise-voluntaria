import { configuracao } from './../../../configuracao';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../servico/usuario/usuario.service';
import { Publicacao } from './../../../servico/publicacao/publicacao';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
    private usuarioService: UsuarioService
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



}
