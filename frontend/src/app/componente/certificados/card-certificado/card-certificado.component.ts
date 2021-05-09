import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from './../../../core/erro/erro.service';
import { CertificadoService } from './../../../servico/certificado/certificado.service';
import { FormControl } from '@angular/forms';
import { configuracao } from './../../../configuracao';
import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Certificado } from './../../../servico/certificado/certificado';
import { AvaliacaoService } from 'src/app/servico/avaliacao/avaliacao.service';
import { RatingChangeEvent } from 'angular-star-rating';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAguardeComponent } from '../../dialogo-aguarde/dialogo-aguarde.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card-certificado',
  templateUrl: './card-certificado.component.html',
  styleUrls: ['./card-certificado.component.css']
})
export class CardCertificadoComponent implements OnInit, OnChanges {

  @Input() certificado: Certificado;
  public url = configuracao.hostFrontend + '/' + configuracao.rotaVisualizaCertificado;
  public avaliacao = 3;
  public teste = new FormControl('');
  public habilitaAvaliacao = true;

  constructor(
    public dialog: MatDialog,
    private avaliacaoService: AvaliacaoService,
    private certificacaoService: CertificadoService,
    private erroService: ErroService,
    private toaster: Toaster
  ) {
    this.teste.disable();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.certificado.currentValue) {
      this.url += '/' + this.certificado.id;
      if (this.certificado.avaliacao != null) {
        this.habilitaAvaliacao = false;
        if (this.certificado.avaliacao.nota) {
          this.avaliacao = this.certificado.avaliacao.nota;
        }
      }
    }
  }

  setAvaliacao(obj: RatingChangeEvent): void {
    this.avaliacao = obj.rating;
  }

  cria(): void {
    this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
    this.avaliacaoService.cria(this.avaliacao, this.certificado.id).subscribe(() => {
      this.habilitaAvaliacao = false;
      this.certificacaoService.obtem(this.certificado.id).subscribe(certificado => {
        this.certificado = certificado;
        this.erroService.exibeMensagemSucesso('Avaliação feita com sucesso.', this.toaster);
        this.dialog.closeAll();
      }, (erro: HttpErrorResponse) => {
        console.log(erro);
        this.dialog.closeAll();
        this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
      });
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.dialog.closeAll();
      this.erroService.exibeMensagemErro(erro.error.message, this.toaster);
    });
  }
}
