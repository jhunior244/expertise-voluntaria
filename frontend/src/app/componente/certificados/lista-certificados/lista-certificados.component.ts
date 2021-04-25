import { configuracao } from './../../../configuracao';
import { SessaoService } from './../../../core/sessao/sessao.service';
import { Usuario } from './../../../servico/usuario/usuario';
import { CertificadoService } from './../../../servico/certificado/certificado.service';
import { Component, OnInit } from '@angular/core';
import { Certificado } from 'src/app/servico/certificado/certificado';
import { MatDialog } from '@angular/material/dialog';
import { CriaCertificadoComponent } from '../cria-certificado/cria-certificado.component';
import { DialogoAguardeComponent } from '../../dialogo-aguarde/dialogo-aguarde.component';

@Component({
  selector: 'app-lista-certificados',
  templateUrl: './lista-certificados.component.html',
  styleUrls: ['./lista-certificados.component.css']
})
export class ListaCertificadosComponent implements OnInit {

  public listaCertificado: Certificado[];
  public tipoUsuarioLogado = 0;
  constructor(
    public dialog: MatDialog,
    private certificadoService: CertificadoService,
    private sessaoService: SessaoService
  ) {
      this.tipoUsuarioLogado = Number.parseInt(this.sessaoService.getTipoUsuario(), 2);
   }

  get usuarioEhOngOsc(): boolean { return this.tipoUsuarioLogado === configuracao.tipoUsuario.ONG_OSC;}

  ngOnInit(): void {
    this.certificadoService.lista(null).subscribe(retorno => {
      this.listaCertificado = retorno.conteudo;
    });
  }

  novoCertificado(): void {
    const dialogRef = this.dialog.open(CriaCertificadoComponent, {
      width: '50vw',
      height: '50vh',
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
      if (dialogRef.componentInstance.certificado?.id){
        this.listaCertificado.unshift(dialogRef.componentInstance.certificado);
      }
      console.log(dialogRef.componentInstance.certificado);
      this.dialog.closeAll();
    });
  }

}
