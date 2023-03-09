import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CertificadoService } from '../../servico/certificado/certificado.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { configuracao } from 'src/app/configuracao';
import { Certificado } from 'src/app/servico/certificado/certificado';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tela-visualiza-certificado',
  templateUrl: './tela-visualiza-certificado.component.html',
  styleUrls: ['./tela-visualiza-certificado.component.css']
})
export class TelaVisualizaCertificadoComponent implements OnInit {
  private subscricao = new Subscription();
  public certificado: Certificado;
  constructor(
    private certificadoService: CertificadoService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private erroService: ErroService,
    private toaster: Toaster
  ) {
    this.subscricao.add(this.activatedRoute.params.subscribe(params => {
      const id = params[configuracao.parametroId];
      this.certificadoService.obtem(id).subscribe(certificado => this.certificado = certificado);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.dialog.closeAll();
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    }));
  }

  ngOnInit(): void {
  }


}
