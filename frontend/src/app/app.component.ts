import { Router, ActivatedRoute } from '@angular/router';
import { SessaoService } from './core/sessao/sessao.service';
import { configuracao } from './configuracao';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Usuario } from './servico/usuario/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public configuracao = configuracao;
  public usuarioLogado$: Observable<Usuario>;
  constructor(
    private sessaoService: SessaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ){
      this.usuarioLogado$ = this.sessaoService.getUsuarioLogado();
  }

  deslogar(){
    this.sessaoService.deslogar();
    this.router.navigate([configuracao.rotaInicio]);
  }
}
