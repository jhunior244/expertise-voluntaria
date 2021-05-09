import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { configuracao } from 'src/app/configuracao';
import { Publicacao } from 'src/app/servico/publicacao/publicacao';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';

@Component({
  selector: 'app-tela-visualiza-publicacao',
  templateUrl: './tela-visualiza-publicacao.component.html',
  styleUrls: ['./tela-visualiza-publicacao.component.css']
})
export class TelaVisualizaPublicacaoComponent implements OnInit {

  private subscricao = new Subscription();
  public publicacao: Publicacao;
  constructor(
    private publicacaoService: PublicacaoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscricao.add(this.activatedRoute.params.subscribe(params => {
      const id = params[configuracao.parametroId];
      this.publicacaoService.obtem(id).subscribe(publicacao => {
        this.publicacao = publicacao;
      });
    }));
  }

  ngOnInit(): void {
  }
}
