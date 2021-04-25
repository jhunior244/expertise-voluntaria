import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { DialogoAguardeComponent } from '../../dialogo-aguarde/dialogo-aguarde.component';
import { NovaPublicacaoComponent } from '../../publicacao/nova-publicacao/nova-publicacao.component';
import { Certificado } from './../../../servico/certificado/certificado';
import { CertificadoService } from './../../../servico/certificado/certificado.service';

@Component({
  selector: 'app-cria-certificado',
  templateUrl: './cria-certificado.component.html',
  styleUrls: ['./cria-certificado.component.css']
})
export class CriaCertificadoComponent implements OnInit {

  public formGroup: FormGroup;
  public certificado = new Certificado();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<NovaPublicacaoComponent>,
    private formBuilder: FormBuilder,
    private erroService: ErroService,
    private toaster: Toaster,
    private certificadoService: CertificadoService
  ) {
    this.formGroup = this.formBuilder.group({
      totalTrabalhado: [null, Validators.required],
      usuarioResposavelServicoPrestado: [null, Validators.required],
      expertiseExercida: [null, Validators.required]
    });
   }

   get totalTrabalhado(): FormControl { return this.formGroup.controls.totalTrabalhado as FormControl; }
   get usuarioResposavelServicoPrestado(): FormControl { return this.formGroup.controls.usuarioResposavelServicoPrestado as FormControl; }
   get expertiseExercida(): FormControl { return this.formGroup.controls.expertiseExercida as FormControl; }

  ngOnInit(): void {
  }

  fechar(): void {
    this.dialogRef.close();
  }

  formularioParaEntidade(): void {
    this.certificado.tempoTrabalhado = this.totalTrabalhado.value;
    this.certificado.usuario = this.usuarioResposavelServicoPrestado.value;
    this.certificado.areaAtuacao = this.expertiseExercida.value;
  }

  cria(): void {
    this.formularioParaEntidade();
    this.dialog.open(DialogoAguardeComponent, DialogoAguardeComponent.configProgressSpinner);
    this.certificadoService.cria(this.certificado).subscribe(certificadoCriado => {
      this.certificado = certificadoCriado;
      this.erroService.exibeMensagemSucesso('Certificado gerado com sucesso!', this.toaster);
      this.dialog.closeAll();
      this.dialogRef.close();
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
      this.dialog.closeAll();
    });
  }

}
