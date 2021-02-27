import { Publicacao } from './../../../servico/publicacao/publicacao';
import { Toaster } from 'ngx-toast-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { ErroService } from 'src/app/core/erro/erro.service';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable()
export class AuthGuardTelaInicio implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.autenticado().pipe(map(autenticado => {
      if (autenticado) {
        return true;
      } else {
        this.router.navigate([configuracao.rotaLogin]);
        return false;
      }
    }));
  }
}

@Component({
  selector: 'app-lista-publicacao',
  templateUrl: './lista-publicacao.component.html',
  styleUrls: ['./lista-publicacao.component.css']
})
export class ListaPublicacaoComponent implements OnInit {

  public listaPublicacao: Publicacao[] = [];

  constructor(
    private publicacaoService: PublicacaoService,
    private erroService: ErroService,
    private toaster: Toaster
  ) {
    this.publicacaoService.lista().subscribe(pagina => {
      this.listaPublicacao = pagina.conteudo;
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
    });
  }

  ngOnInit(): void {
  }

}
