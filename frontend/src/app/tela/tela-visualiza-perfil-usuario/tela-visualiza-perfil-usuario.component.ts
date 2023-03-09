import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from './../../core/erro/erro.service';
import { UsuarioService } from 'src/app/servico/usuario/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { configuracao } from 'src/app/configuracao';
import { DialogoAguardeComponent } from 'src/app/componente/dialogo-aguarde/dialogo-aguarde.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/servico/usuario/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tela-visualiza-perfil-usuario',
  templateUrl: './tela-visualiza-perfil-usuario.component.html',
  styleUrls: ['./tela-visualiza-perfil-usuario.component.css']
})
export class TelaVisualizaPerfilUsuarioComponent implements OnInit {

  private subscricao = new Subscription();
  private id: string;
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private erroService: ErroService,
    private toaster: Toaster,
    public dialog: MatDialog,
    private telaInicioService: TelaInicioService
  ) { 
    this.subscricao.add(this.activatedRoute.params.subscribe(params => {
      this.id = params[configuracao.parametroId];
      if (this.id) {
        this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
        this.usuarioService.obtem(this.id).subscribe(usuario => {
          this.usuario = usuario;
          this.dialog.closeAll();
        }, (erro: HttpErrorResponse) => {
          console.log(erro);
          this.dialog.closeAll();
          this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
        });
      }
    }));

    this.telaInicioService.anunciaexibeFiltro(false);
  }

  ngOnInit(): void {
  }

}
