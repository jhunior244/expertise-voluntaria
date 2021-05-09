import { ErroService } from 'src/app/core/erro/erro.service';
import { Toaster } from 'ngx-toast-notifications';
import { configuracao } from './../../../configuracao';
import { SessaoService } from './../../../core/sessao/sessao.service';
import { Usuario } from './../../../servico/usuario/usuario';
import { CertificadoService } from './../../../servico/certificado/certificado.service';
import { Component, OnInit } from '@angular/core';
import { Certificado } from 'src/app/servico/certificado/certificado';
import { MatDialog } from '@angular/material/dialog';
import { CriaCertificadoComponent } from '../cria-certificado/cria-certificado.component';
import { DialogoAguardeComponent } from '../../dialogo-aguarde/dialogo-aguarde.component';
import { TelaInicioService } from 'src/app/tela/tela-inicio/tela-inicio.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-certificados',
  templateUrl: './lista-certificados.component.html',
  styleUrls: ['./lista-certificados.component.css']
})
export class ListaCertificadosComponent implements OnInit {

  public listaCertificado: Certificado[];
  public tipoUsuarioLogado = 0;
  private subscricao = new Subscription();
  
  constructor(
    public dialog: MatDialog,
    private certificadoService: CertificadoService,
    private sessaoService: SessaoService,
    private telaInicioService: TelaInicioService,
    private toaster: Toaster,
    private erroService: ErroService
  ) {
      this.tipoUsuarioLogado = Number.parseInt(this.sessaoService.getTipoUsuario());
      this.telaInicioService.anunciaexibeFiltro(true);
      this.telaInicioService.anunciaExibeFiltroTipoUsuario(this.usuarioEhOngOsc);
      this.telaInicioService.anunciaExibeFiltroEstado(false);
      this.telaInicioService.anunciaExibeFiltroCidade(false);

      this.telaInicioService.anunciaExibeFiltroTodasPublicacoes(false);
   }

  get usuarioEhOngOsc(): boolean { return this.tipoUsuarioLogado === configuracao.tipoUsuario.ONG_OSC;}

  ngOnInit(): void {
    this.subscricao.add(this.telaInicioService.botaoPesquisarClicado$.subscribe(busca => {
      if (busca) {
        this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
        this.certificadoService.lista(
          this.telaInicioService.listaAreaAtuacao,
          this.telaInicioService.listaTipoPessoa
        ).subscribe(pagina => {
          this.dialog.closeAll();
          this.listaCertificado = pagina.conteudo;
        }, (erro: HttpErrorResponse) => {
          console.log(erro);
          this.dialog.closeAll();
          this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
        });
      }
    }));
  }

  novoCertificado(): void {
    const dialogRef = this.dialog.open(CriaCertificadoComponent, {
      width: '50vw',
      height: '60vh',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
      if (dialogRef.componentInstance.certificado?.id){
        this.listaCertificado.unshift(dialogRef.componentInstance.certificado);
      }
      this.dialog.closeAll();
    });
  }

}
