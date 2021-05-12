import { configuracao } from './../../configuracao';
import { Router } from '@angular/router';
import { SessaoService } from './../../core/sessao/sessao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-pagina-inicial-site',
  templateUrl: './tela-pagina-inicial-site.component.html',
  styleUrls: ['./tela-pagina-inicial-site.component.css']
})
export class TelaPaginaInicialSiteComponent implements OnInit {

  constructor(
    private sessaoService: SessaoService,
    private router: Router
  ) { 
    this.sessaoService.deslogar();
  }

  ngOnInit(): void {
  }

  entrar(){
    this.router.navigate([configuracao.rotaLogin]);
  }
  
  cadastrar(){
    this.router.navigate([configuracao.rotaCadastro]);
  }

}
