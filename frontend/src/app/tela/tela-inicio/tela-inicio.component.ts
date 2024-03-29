import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { configuracao } from 'src/app/configuracao';
import { Cidade } from 'src/app/servico/usuario/cidade';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { DialogoAguardeComponent } from './../../componente/dialogo-aguarde/dialogo-aguarde.component';
import { AuthService } from './../../core/auth/auth.service';
import { SessaoService } from './../../core/sessao/sessao.service';
import { CidadeService } from './../../servico/usuario/cidade.service';
import { EstadoService } from './../../servico/usuario/estado.service';
import { TelaInicioService } from './tela-inicio.service';


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
  selector: 'app-tela-inicio',
  templateUrl: './tela-inicio.component.html',
  styleUrls: ['./tela-inicio.component.css']
})
export class TelaInicioComponent implements OnInit {
  public usuarioLogado$: Observable<Usuario>;

  public formGroup: FormGroup;
  public ufUsuarioLogado: string;
  public cidadeUsuarioLogado: string;
  public configuracao = configuracao;
  public exibeFiltro = true;
  public exibeFiltroTodosUsuario = false;
  public exibeFiltroEstado = false;
  public exibeFiltroCidade = false;
  public exibeFiltroTipoUsuario = false;
  private subscricao = new Subscription();
  public exibeSubBotoesRede = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sessaoService: SessaoService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private router: Router,
    private telaInicioService: TelaInicioService
  ) {
    this.formGroup = this.formBuilder.group({
      expertiseNecessaria: [null],
      uf: [null],
      cidade: [null],
      tipoPessoa: [null],
      todosUsuarios: [0]
    });

    this.usuarioLogado$ = this.sessaoService.getUsuarioLogado();
    this.ufUsuarioLogado = this.sessaoService.getUf();
    this.cidadeUsuarioLogado = this.sessaoService.getCidade();
  }

  deslogar(){
    this.sessaoService.deslogar();
    this.router.navigate([configuracao.rotaInicio]);
  }

  get expertiseNecessaria(): FormControl { return this.formGroup.controls.expertiseNecessaria as FormControl; }
  get uf(): FormControl { return this.formGroup.controls.uf as FormControl; }
  get cidade(): FormControl { return this.formGroup.controls.cidade as FormControl; }
  get tipoPessoa(): FormControl { return this.formGroup.controls.tipoPessoa as FormControl; }
  get todosUsuarios(): FormControl { return this.formGroup.controls.todosUsuarios as FormControl; }

  ngOnInit(): void {
    this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
    const estado$ = this.estadoService.lista(this.ufUsuarioLogado);
    const cidade$ = this.cidadeService.obtem(this.cidadeUsuarioLogado, this.ufUsuarioLogado);
    forkJoin([estado$, cidade$]).subscribe(resultado => {
      const listaCidade: Cidade[] = [];
      listaCidade.push(resultado[1]);
      this.uf.setValue(resultado[0]);
      this.cidade.setValue(listaCidade);
      this.expertiseNecessaria.setValue(this.telaInicioService.listaAreaAtuacao);
      this.telaInicioService.anunciaListaEstado(resultado[0]);
      this.telaInicioService.anunciaListaCidade(listaCidade);
      this.anunciaClickPesquisar();
      this.dialog.closeAll();
    });

    this.subscricao.add(this.telaInicioService.exibeFiltroAnunciado$.subscribe(exibe => {
      this.exibeFiltro = exibe;
    }));

    this.subscricao.add(this.telaInicioService.exibeFiltroTodasPublicacoes$.subscribe(exibe => {
      this.exibeFiltroTodosUsuario = exibe;
    }));

    this.subscricao.add(this.telaInicioService.exibeFiltroTipoUsuario$.subscribe(exibe => {
      this.exibeFiltroTipoUsuario = exibe;
    }));

    this.subscricao.add(this.telaInicioService.exibeFiltroTodasEstado$.subscribe(exibe => {
      this.exibeFiltroEstado = exibe;
    }));

    this.subscricao.add(this.telaInicioService.exibeFiltroTodasCidade$.subscribe(exibe => {
      this.exibeFiltroCidade = exibe;
    }));

    this.subscricao.add(this.tipoPessoa.valueChanges.subscribe(() => {
      this.telaInicioService.anunciaListaTipoPessoa(this.tipoPessoa.value);
    }));

    this.subscricao.add(this.todosUsuarios.valueChanges.subscribe((value) => {
      this.telaInicioService.alteraListarApenasMinhasPublicacoes(value);
    }));
  }

  anunciaClickPesquisar(): void {
    this.telaInicioService.anunciaNovaPesquisa(true);
  }

  calculaExibeSubBotoesRede(){
    this.exibeSubBotoesRede = !this.exibeSubBotoesRede;
  }

  minimizaSubBotoes(){
    this.exibeSubBotoesRede = false;
  }
}


