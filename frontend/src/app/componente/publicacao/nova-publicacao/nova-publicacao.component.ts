import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Toaster } from 'ngx-toast-notifications';
import { ErroService } from 'src/app/core/erro/erro.service';
import { Imagem } from 'src/app/servico/imagem/imagem';
import { ImagemService } from 'src/app/servico/imagem/imagem.service';
import { Publicacao } from 'src/app/servico/publicacao/publicacao';
import { PublicacaoService } from 'src/app/servico/publicacao/publicacao.service';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  public imagemCarregada: Imagem;
  public publicacao = new Publicacao();
  public formGroup: FormGroup;
  public alcance = 25;
  @ViewChild('inputArquivo') inputArquivo: ElementRef;
  public teste: any;

  constructor(
    public dialogRef: MatDialogRef<NovaPublicacaoComponent>,
    private formBuilder: FormBuilder,
    private erroService: ErroService,
    private imagemService: ImagemService,
    private toaster: Toaster,
    private publicacaoService: PublicacaoService,
    private sanitizer: DomSanitizer
  ) {
    this.formGroup = this.formBuilder.group({
      titulo: [null],
      descricao: [null],
      raioAlcance: [25]
    });
  }
  get titulo(): FormControl { return this.formGroup.controls.titulo as FormControl; }
  get descricao(): FormControl { return this.formGroup.controls.descricao as FormControl; }
  get raioAlcance(): FormControl { return this.formGroup.controls.raioAlcance as FormControl; }
  get habilitaCadastrar(): boolean { return this.titulo.value !== null && this.titulo.value !== ''; }

  ngOnInit(): void {
  }

  label(valor: number): string {
    return valor + ' km';
  }

  fechar(): void {
    this.dialogRef.close();
  }

  formularioParaEntidade(): void {
    this.publicacao.titulo = this.titulo.value;
    this.publicacao.descricao = this.descricao.value;
    this.publicacao.raioAlcance = this.raioAlcance.value;
    this.publicacao.listaImagem = new Array();
    if (this.imagemCarregada) {
      this.publicacao.listaImagem.push(this.imagemCarregada);
    }
  }

  enviaPublicacao(): void {
    this.formularioParaEntidade();
    this.publicacaoService.cria(this.publicacao).subscribe(publicacao => {
      this.erroService.exibeMensagemSucesso('Publicação feita com sucesso', this.toaster);
      this.dialogRef.close();
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error.erro, this.toaster);
    });
  }

  apagaImagem(): void {
    this.imagemCarregada = null;
    this.inputArquivo.nativeElement.value = '';
  }

  carregaImagem(event: any): void {
    if (event?.target?.files[0]?.size > 1048576) {
      this.erroService.exibeMensagemErro('Arquivo muito grande. Tamanho máximo permitido: 1 megabyte', this.toaster);
      return;
    }

    this.imagemService.uploadoImagem(event.target.files[0]).subscribe(imagem => {
      this.imagemCarregada = imagem;
      console.log(this.imagemCarregada);
    }, (erro: HttpErrorResponse) => {
      console.log(erro);
      this.erroService.exibeMensagemErro(erro.error?.erro, this.toaster);
    });
  }
}
